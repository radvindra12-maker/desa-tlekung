import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

const allowedStatuses = [
  "pending",
  "verified",
  "contacted",
  "negotiation",
  "quotation_sent",
  "approved",
  "completed",
  "rejected",
] as const;

type Status = (typeof allowedStatuses)[number];

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

// =========================
// GET PURCHASE REQUEST
// =========================

export async function GET(
  _request: Request,
  { params }: RouteProps
) {
  try {
    const { id } = await params;

    const supabase = await supabaseServer;

    const { data, error } = await supabase
      .from("purchase_requests")
      .select(
        "id, full_name, status, estimated_total, admin_note, created_at"
      )
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error(
        "Gagal mengambil purchase request:",
        error
      );

      return NextResponse.json(
        {
          error: "Permintaan pembelian tidak ditemukan.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error(
      "Error GET purchase request:",
      error
    );

    return NextResponse.json(
      {
        error: "Terjadi kesalahan server.",
      },
      {
        status: 500,
      }
    );
  }
}

// =========================
// PATCH PURCHASE REQUEST
// =========================

export async function PATCH(
  request: Request,
  { params }: RouteProps
) {
  try {
    const { id } = await params;

    const body = await request.json();

    const {
      status,
      estimated_total,
      admin_note,
    } = body;

    // =========================
    // VALIDASI
    // =========================

    if (
      status === undefined &&
      estimated_total === undefined &&
      admin_note === undefined
    ) {
      return NextResponse.json(
        {
          error: "Tidak ada data yang diperbarui.",
        },
        {
          status: 400,
        }
      );
    }

    // =========================
    // DATA UPDATE
    // =========================

    const updateData: {
      status?: Status;
      estimated_total?: number | null;
      admin_note?: string | null;
    } = {};

    // =========================
    // UPDATE STATUS
    // =========================

    if (status !== undefined) {
      if (
        typeof status !== "string" ||
        !allowedStatuses.includes(status as Status)
      ) {
        return NextResponse.json(
          {
            error: "Status tidak valid.",
          },
          {
            status: 400,
          }
        );
      }

      updateData.status = status as Status;
    }

    // =========================
    // UPDATE TOTAL
    // =========================

    if (estimated_total !== undefined) {
      const numericTotal = Number(estimated_total);

      if (
        Number.isNaN(numericTotal) ||
        numericTotal < 0
      ) {
        return NextResponse.json(
          {
            error: "Total harga tidak valid.",
          },
          {
            status: 400,
          }
        );
      }

      updateData.estimated_total = numericTotal;
    }

    // =========================
    // UPDATE CATATAN ADMIN
    // =========================

    if (admin_note !== undefined) {
      if (
        admin_note !== null &&
        typeof admin_note !== "string"
      ) {
        return NextResponse.json(
          {
            error: "Catatan admin tidak valid.",
          },
          {
            status: 400,
          }
        );
      }

      updateData.admin_note = admin_note;
    }

    // =========================
    // SUPABASE
    // =========================

   const supabase = await supabaseServer;

const { data, error } = await supabase
  .from("purchase_requests")
  .update(updateData as never)
  .eq("id", id)
  .select()
  .single();

if (error) {
  console.error(
    "Gagal memperbarui purchase request:",
    error
  );

  return NextResponse.json(
    {
      error:
        error.message ||
        "Gagal memperbarui data permintaan.",
    },
    {
      status: 500,
    }
  );
}

return NextResponse.json(data);
  } catch (error) {
    console.error(
      "Error PATCH purchase request:",
      error
    );

    return NextResponse.json(
      {
        error: "Terjadi kesalahan server.",
      },
      {
        status: 500,
      }
    );
  }
}