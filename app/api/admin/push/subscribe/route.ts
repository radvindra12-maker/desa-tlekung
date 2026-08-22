import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AdminSupabaseClient } from "@/lib/types/admin-database";

type SubscriptionBody = {
  endpoint?: unknown;
  keys?: {
    p256dh?: unknown;
    auth?: unknown;
  };
};

function getAdminClient(
  supabase: Awaited<
    ReturnType<typeof createSupabaseServerClient>
  >
) {
  return supabase as unknown as AdminSupabaseClient;
}

export async function POST(request: Request) {
  try {
    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      console.error(
        "Push subscribe - auth error:",
        authError
      );

      return NextResponse.json(
        {
          error: "Gagal memverifikasi sesi.",
          details:
            process.env.NODE_ENV !== "production"
              ? authError.message
              : undefined,
        },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        {
          error: "Anda harus login.",
        },
        { status: 401 }
      );
    }

    const adminSupabase =
      getAdminClient(supabase);

    const {
      data: adminUser,
      error: adminError,
    } = await adminSupabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError) {
      console.error(
        "Push subscribe - admin check error:",
        adminError
      );

      return NextResponse.json(
        {
          error:
            "Gagal memverifikasi hak akses admin.",
          details:
            process.env.NODE_ENV !== "production"
              ? adminError.message
              : undefined,
        },
        { status: 500 }
      );
    }

    if (!adminUser) {
      return NextResponse.json(
        {
          error:
            "Anda tidak memiliki akses admin.",
        },
        { status: 403 }
      );
    }

    const body =
      (await request.json()) as SubscriptionBody;

    const endpoint =
      typeof body.endpoint === "string"
        ? body.endpoint.trim()
        : "";

    const p256dh =
      typeof body.keys?.p256dh === "string"
        ? body.keys.p256dh.trim()
        : "";

    const auth =
      typeof body.keys?.auth === "string"
        ? body.keys.auth.trim()
        : "";

    if (
      !endpoint ||
      !endpoint.startsWith("https://") ||
      !p256dh ||
      !auth
    ) {
      console.error(
        "Push subscribe - invalid payload:",
        {
          hasEndpoint: Boolean(endpoint),
          hasP256dh: Boolean(p256dh),
          hasAuth: Boolean(auth),
        }
      );

      return NextResponse.json(
        {
          error:
            "Data push subscription tidak valid.",
        },
        { status: 400 }
      );
    }

    const now =
      new Date().toISOString();

    const {
      data,
      error: subscriptionError,
    } = await adminSupabase
      .from("admin_push_subscriptions")
      .upsert(
        {
          user_id: user.id,
          endpoint,
          p256dh,
          auth,
          updated_at: now,
        },
        {
          onConflict:
            "user_id,endpoint",
        }
      )
      .select(
        "id, user_id, created_at, updated_at"
      )
      .single();

    if (subscriptionError) {
      console.error(
        "Push subscribe - database error:",
        {
          message:
            subscriptionError.message,
          details:
            subscriptionError.details,
          hint: subscriptionError.hint,
          code: subscriptionError.code,
        }
      );

      return NextResponse.json(
        {
          error:
            "Gagal menyimpan pengaturan notifikasi.",
          details:
            process.env.NODE_ENV !== "production"
              ? subscriptionError.message
              : undefined,
          code:
            process.env.NODE_ENV !== "production"
              ? subscriptionError.code
              : undefined,
          hint:
            process.env.NODE_ENV !== "production"
              ? subscriptionError.hint
              : undefined,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      subscriptionId: data?.id ?? null,
    });
  } catch (error) {
    console.error(
      "Push subscribe - unexpected error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan saat mengaktifkan notifikasi.",
        details:
          process.env.NODE_ENV !== "production"
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request
) {
  try {
    const supabase =
      await createSupabaseServerClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          error: "Anda harus login.",
        },
        { status: 401 }
      );
    }

    const body =
      (await request.json()) as {
        endpoint?: unknown;
      };

    const endpoint =
      typeof body.endpoint === "string"
        ? body.endpoint.trim()
        : "";

    if (!endpoint) {
      return NextResponse.json(
        {
          error:
            "Endpoint subscription tidak valid.",
        },
        { status: 400 }
      );
    }

    const adminSupabase =
      getAdminClient(supabase);

    const {
      data: adminUser,
      error: adminError,
    } = await adminSupabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (adminError || !adminUser) {
      return NextResponse.json(
        {
          error:
            "Anda tidak memiliki akses admin.",
        },
        { status: 403 }
      );
    }

    const { error } =
      await adminSupabase
        .from(
          "admin_push_subscriptions"
        )
        .delete()
        .eq("user_id", user.id)
        .eq("endpoint", endpoint);

    if (error) {
      console.error(
        "Push unsubscribe - database error:",
        error
      );

      return NextResponse.json(
        {
          error:
            "Gagal menonaktifkan notifikasi.",
          details:
            process.env.NODE_ENV !== "production"
              ? error.message
              : undefined,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Push unsubscribe - unexpected error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Terjadi kesalahan saat menonaktifkan notifikasi.",
        details:
          process.env.NODE_ENV !== "production"
            ? error instanceof Error
              ? error.message
              : String(error)
            : undefined,
      },
      { status: 500 }
    );
  }
}