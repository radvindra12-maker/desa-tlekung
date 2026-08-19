import { notFound } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import PurchaseRequestStatus from "@/components/purchase-requests/PurchaseRequestStatus";
import PurchaseRequestTotal from "@/components/purchase-requests/PurchaseRequestTotal";
import { PurchaseRequestNote } from "@/components/purchase-requests/PurchaseRequestNote";
import Link from "next/link";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function PurchaseRequestDetailPage({
  params,
}: PageProps) {
  const { id } = await params;

  const supabase = await supabaseServer;

  // =========================
  // PURCHASE REQUEST
  // =========================

  const { data: request, error: requestError } = await supabase
    .from("purchase_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (requestError) {
    console.error(
      "Gagal mengambil purchase request:",
      requestError
    );
  }

  if (!request) {
    notFound();
  }

  // =========================
  // PURCHASE REQUEST ITEMS
  // =========================

  const { data: items, error: itemsError } = await supabase
    .from("purchase_request_items")
    .select("*")
    .eq("purchase_request_id", id);

  if (itemsError) {
    console.error(
      "Gagal mengambil purchase request items:",
      itemsError
    );
  }

  const purchaseItems = items ?? [];

  return (
    <main className="min-h-screen bg-white px-6 py-10">
     <div className="mx-auto max-w-5xl">

  {/* KEMBALI */}
  <Link
    href="/purchase-requests"
    className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-stone-600 transition hover:text-stone-900"
  >
    ← Kembali ke Permintaan Pembelian
  </Link>

  {/* =========================
      TITLE
  ========================= */}

  <h1 className="text-3xl font-bold">
    Detail Permintaan Pembelian
  </h1>

        {/* =========================
            INFORMASI PEMBELI
        ========================= */}

        <div className="mt-8 rounded-xl border p-6">

          <h2 className="text-xl font-semibold">
            Informasi Pembeli
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">

            <div>
              <p className="text-sm text-gray-500">
                Nama
              </p>

              <p className="font-medium">
                {request.full_name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Email
              </p>

              <p className="font-medium">
                {request.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Nomor HP
              </p>

              <p className="font-medium">
                {request.phone}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Instansi
              </p>

              <p className="font-medium">
                {request.organization || "-"}
              </p>
            </div>

           <div>
  <p className="text-sm text-gray-500">
    Status
  </p>

  <PurchaseRequestStatus
    requestId={request.id}
    currentStatus={request.status}
  />
</div>

            <div>
              <p className="text-sm text-gray-500">
                Tanggal Permintaan
              </p>

              <p className="font-medium">
                {new Date(request.created_at).toLocaleDateString(
                  "id-ID",
                  {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  }
                )}
              </p>
            </div>

          </div>
        </div>

        {/* =========================
            PRODUK YANG DIMINTA
        ========================= */}

        <div className="mt-8 rounded-xl border p-6">

          <h2 className="text-xl font-semibold">
            Produk yang Diminta
          </h2>

          {purchaseItems.length === 0 ? (
            <p className="mt-5 text-gray-500">
              Tidak ada produk dalam permintaan ini.
            </p>
          ) : (
            <div className="mt-5 space-y-4">

              {purchaseItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border bg-gray-50 p-5"
                >

                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <div>
                      <h3 className="text-lg font-semibold">
                        {item.product_name ?? "Produk"}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        Varian:{" "}
                        {item.variant_name ?? "-"}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Jumlah:{" "}
                        {item.quantity}
                      </p>
                    </div>

                    <div className="text-left md:text-right">

                      {item.price_on_request ? (
                        <p className="font-semibold text-amber-700">
                          Harga berdasarkan permintaan
                        </p>
                      ) : (
                        <p className="font-semibold text-emerald-700">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 0,
                          }).format(item.price ?? 0)}
                        </p>
                      )}

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

        {/* =========================
            RINGKASAN
        ========================= */}

        <div className="mt-8 rounded-xl border p-6">

          <h2 className="text-xl font-semibold">
            Ringkasan Permintaan
          </h2>

          <div className="mt-5 space-y-3">

            <div className="flex justify-between">
              <span className="text-gray-500">
                Jumlah Produk
              </span>

              <span className="font-medium">
                {purchaseItems.length}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Total Quantity
              </span>

              <span className="font-medium">
                {purchaseItems.reduce(
                  (total, item) =>
                    total + Number(item.quantity ?? 0),
                  0
                )}
              </span>
            </div>

            <div className="border-t pt-4">
  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <span className="font-semibold">
      Total
    </span>

    <PurchaseRequestTotal
      requestId={request.id}
      currentTotal={request.estimated_total}
    />
  </div>
{/* =========================
    CATATAN ADMIN
========================= */}

<div className="mt-8 rounded-xl border p-6">
  <h2 className="text-xl font-semibold">
    Catatan Admin
  </h2>

  <p className="mt-1 text-sm text-gray-500">
    Catatan internal untuk permintaan pembelian ini.
  </p>

  <div className="mt-5">
    <PurchaseRequestNote
      requestId={request.id}
      currentNote={(request as { admin_note?: string | null }).admin_note ?? null
  }
      
    />
  </div>
</div>

</div>

          </div>
        </div>

      </div>
    </main>
  );
}