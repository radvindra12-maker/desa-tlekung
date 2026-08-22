import { NextResponse } from "next/server";
import webpush from "web-push";

import { createClient } from "@supabase/supabase-js";

import type {
  AdminDatabase,
} from "@/lib/types/admin-database";

type WebhookPayload = {
  type?: string;
  table?: string;
  schema?: string;
  record?: Record<
    string,
    unknown
  > | null;
};

type StoredSubscription = {
  id: string;
  user_id: string;
  endpoint: string;
  p256dh: string;
  auth: string;
};

const supabaseUrl =
  process.env
    .NEXT_PUBLIC_SUPABASE_URL;

const serviceRoleKey =
  process.env
    .SUPABASE_SERVICE_ROLE_KEY;

const vapidPublicKey =
  process.env
    .NEXT_PUBLIC_VAPID_PUBLIC_KEY;

const vapidPrivateKey =
  process.env
    .PUSH_VAPID_PRIVATE_KEY;

const vapidSubject =
  process.env.PUSH_VAPID_SUBJECT;

const webhookSecret =
  process.env.PUSH_WEBHOOK_SECRET;

if (
  supabaseUrl &&
  vapidPublicKey &&
  vapidPrivateKey &&
  vapidSubject
) {
  webpush.setVapidDetails(
    vapidSubject,
    vapidPublicKey,
    vapidPrivateKey
  );
}

export async function POST(
  request: Request
) {
  try {
    if (
      !supabaseUrl ||
      !serviceRoleKey ||
      !vapidPublicKey ||
      !vapidPrivateKey ||
      !vapidSubject ||
      !webhookSecret
    ) {
      console.error(
        "Push webhook configuration is incomplete."
      );

      return NextResponse.json(
        {
          error:
            "Push webhook belum dikonfigurasi.",
        },
        {
          status: 500,
        }
      );
    }

    const incomingSecret =
      request.headers.get(
        "x-webhook-secret"
      );

    if (
      !incomingSecret ||
      incomingSecret !==
        webhookSecret
    ) {
      return NextResponse.json(
        {
          error: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const payload =
      (await request.json()) as WebhookPayload;

    if (
      payload.type !== "INSERT" ||
      payload.schema !== "public" ||
      payload.table !==
        "purchase_requests" ||
      !payload.record
    ) {
      return NextResponse.json({
        ignored: true,
      });
    }

    const requestRecord =
      payload.record;

    const requestId =
      typeof requestRecord.id ===
      "string"
        ? requestRecord.id
        : null;

    if (!requestId) {
      return NextResponse.json(
        {
          error:
            "Purchase request ID tidak ditemukan.",
        },
        {
          status: 400,
        }
      );
    }

    const fullName =
      typeof requestRecord.full_name ===
      "string"
        ? requestRecord.full_name
        : typeof requestRecord.customer_name ===
            "string"
          ? requestRecord.customer_name
          : "Seseorang";

    const supabase =
      createClient<AdminDatabase>(
        supabaseUrl,
        serviceRoleKey,
        {
          auth: {
            autoRefreshToken:
              false,
            persistSession:
              false,
          },
        }
      );

    const { data: admins, error: adminError } =
      await supabase
        .from("admin_users")
        .select("user_id");

    if (adminError) {
      console.error(
        "Gagal mengambil daftar admin:",
        adminError
      );

      return NextResponse.json(
        {
          error:
            "Gagal mengambil daftar admin.",
        },
        {
          status: 500,
        }
      );
    }

    const adminIds =
      (admins ?? []).map(
        (admin) => admin.user_id
      );

    if (adminIds.length === 0) {
      return NextResponse.json({
        sent: 0,
        message:
          "Tidak ada admin aktif.",
      });
    }

    const {
      data: subscriptions,
      error:
        subscriptionError,
    } = await supabase
      .from(
        "admin_push_subscriptions"
      )
      .select(
        "id, user_id, endpoint, p256dh, auth"
      )
      .in("user_id", adminIds);

    if (subscriptionError) {
      console.error(
        "Gagal mengambil push subscriptions:",
        subscriptionError
      );

      return NextResponse.json(
        {
          error:
            "Gagal mengambil push subscriptions.",
        },
        {
          status: 500,
        }
      );
    }

    const storedSubscriptions =
      (subscriptions ??
        []) as StoredSubscription[];

    if (
      storedSubscriptions.length ===
      0
    ) {
      return NextResponse.json({
        sent: 0,
        message:
          "Tidak ada perangkat admin yang mengaktifkan notifikasi.",
      });
    }

    const notificationPayload =
      JSON.stringify({
        title:
          "Permintaan Pembelian Baru",
        body: `${fullName} mengirim permintaan pembelian.`,
        requestId,
      });

    const topic =
      `pr-${requestId
        .replace(/-/g, "")
        .slice(0, 29)}`;

    const results =
      await Promise.allSettled(
        storedSubscriptions.map(
          async (subscription) => {
            try {
              await webpush.sendNotification(
                {
                  endpoint:
                    subscription.endpoint,
                  keys: {
                    p256dh:
                      subscription.p256dh,
                    auth:
                      subscription.auth,
                  },
                },
                notificationPayload,
                {
                  TTL: 300,
                  urgency: "high",
                  topic,
                }
              );

              return {
                id: subscription.id,
                status: "sent" as const,
              };
            } catch (error) {
              const statusCode =
                typeof error ===
                  "object" &&
                error !== null &&
                "statusCode" in
                  error
                  ? Number(
                      (
                        error as {
                          statusCode?: unknown;
                        }
                      ).statusCode
                    )
                  : null;

              if (
                statusCode === 404 ||
                statusCode === 410
              ) {
                await supabase
                  .from(
                    "admin_push_subscriptions"
                  )
                  .delete()
                  .eq(
                    "id",
                    subscription.id
                  );

                return {
                  id: subscription.id,
                  status:
                    "removed" as const,
                };
              }

              console.error(
                "Push gagal:",
                {
                  subscriptionId:
                    subscription.id,
                  error,
                }
              );

              return {
                id: subscription.id,
                status:
                  "failed" as const,
              };
            }
          }
        )
      );

    const sent = results.filter(
      (result) =>
        result.status === "fulfilled" &&
        result.value.status ===
          "sent"
    ).length;

    const removed =
      results.filter(
        (result) =>
          result.status ===
            "fulfilled" &&
          result.value.status ===
            "removed"
      ).length;

    const failed =
      results.length -
      sent -
      removed;

    return NextResponse.json({
      sent,
      removed,
      failed,
    });
  } catch (error) {
    console.error(
      "Unexpected push webhook error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan internal.",
      },
      {
        status: 500,
      }
    );
  }
}