"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import PurchaseRequestMobileCard from "@/components/purchase-requests/PurchaseRequestMobileCard";

type PurchaseRequest = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  organization: string | null;
  status: string | null;
  estimated_total: number | null;
  created_at: string;
};

function SummaryCard({
  label,
  value,
  className,
}: {
  label: string;
  value: number;
  className: string;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${className}`}
    >
      <p className="text-sm font-medium opacity-80">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string | null;
}) {
  const normalizedStatus =
    status?.toLowerCase() ?? "pending";

  const statusConfig: Record<
    string,
    {
      label: string;
      className: string;
    }
  > = {
    approved: {
      label: "Disetujui",
      className:
        "bg-gray-100 text-gray-800",
    },

    verified: {
      label: "Terverifikasi",
      className:
        "bg-blue-100 text-blue-800",
    },

    quotation_sent: {
      label: "Penawaran Dikirim",
      className:
        "bg-purple-100 text-purple-800",
    },

    negotiation: {
      label: "Negosiasi",
      className:
        "bg-amber-100 text-amber-800",
    },

    rejected: {
      label: "Ditolak",
      className:
        "bg-red-100 text-red-800",
    },

    completed: {
      label: "Selesai",
      className:
        "bg-emerald-100 text-emerald-800",
    },
  };

  const config =
    statusConfig[normalizedStatus] ?? {
      label: normalizedStatus,
      className:
        "bg-gray-100 text-gray-700",
    };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${config.className}`}
    >
      {config.label}
    </span>
  );
}

function formatRequestId(id: string) {
  return `${id.slice(0, 8)}…${id.slice(-6)}`;
}

export default function PurchaseRequestsPage() {
  const [requests, setRequests] = useState<
    PurchaseRequest[]
  >([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(
    null
  );

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("all");

  const [currentPage, setCurrentPage] = useState(1);

  const [copiedRequestId, setCopiedRequestId] =
    useState<string | null>(null);

  const itemsPerPage = 10;

  useEffect(() => {
    async function loadRequests() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("purchase_requests")
        .select(`
          id,
          full_name,
          email,
          phone,
          organization,
          status,
          estimated_total,
          created_at
        `)
        .order("created_at", {
          ascending: false,
        });

      if (error) {
        console.error(
          "Failed to load purchase requests:",
          error
        );

        setError(
          "Gagal memuat permintaan pembelian."
        );

        setRequests([]);
      } else {
        setRequests(
          (data ?? []) as PurchaseRequest[]
        );
      }

      setLoading(false);
    }

    loadRequests();
  }, []);

  const statusSummary = useMemo(() => {
    return {
      approved: requests.filter(
        (request) =>
          request.status?.toLowerCase() ===
          "approved"
      ).length,

      verified: requests.filter(
        (request) =>
          request.status?.toLowerCase() ===
          "verified"
      ).length,

      quotationSent: requests.filter(
        (request) =>
          request.status?.toLowerCase() ===
          "quotation_sent"
      ).length,

      negotiation: requests.filter(
        (request) =>
          request.status?.toLowerCase() ===
          "negotiation"
      ).length,

      rejected: requests.filter(
        (request) =>
          request.status?.toLowerCase() ===
          "rejected"
      ).length,

      completed: requests.filter(
        (request) =>
          request.status?.toLowerCase() ===
          "completed"
      ).length,
    };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return requests.filter((request) => {
      const matchesSearch =
        keyword === "" ||
        request.id
          .toLowerCase()
          .includes(keyword) ||
        request.full_name
          ?.toLowerCase()
          .includes(keyword) ||
        request.email
          ?.toLowerCase()
          .includes(keyword) ||
        request.phone
          ?.toLowerCase()
          .includes(keyword) ||
        request.organization
          ?.toLowerCase()
          .includes(keyword);

      const normalizedStatus =
        request.status?.toLowerCase() ??
        "pending";

      const matchesStatus =
        statusFilter === "all" ||
        normalizedStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [requests, search, statusFilter]);

  const totalPages = Math.ceil(
    filteredRequests.length / itemsPerPage
  );

  const paginatedRequests = useMemo(() => {
    const startIndex =
      (currentPage - 1) * itemsPerPage;

    const endIndex =
      startIndex + itemsPerPage;

    return filteredRequests.slice(
      startIndex,
      endIndex
    );
  }, [filteredRequests, currentPage]);

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const copyRequestId = async (
    requestId: string
  ) => {
    try {
      await navigator.clipboard.writeText(
        requestId
      );

      setCopiedRequestId(requestId);

      window.setTimeout(() => {
        setCopiedRequestId((current) =>
          current === requestId
            ? null
            : current
        );
      }, 1500);
    } catch {
      console.error(
        "Gagal menyalin ID permintaan."
      );
    }
  };

  return (
    <main className="min-h-screen bg-stone-50 p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl font-bold text-stone-900 sm:text-3xl">
            Permintaan Pembelian
          </h1>

          <p className="mt-2 text-sm text-stone-600 sm:text-base">
            Kelola seluruh permintaan pembelian
            yang masuk.
          </p>
        </div>

        {/* SUMMARY */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
          <SummaryCard
            label="Disetujui"
            value={statusSummary.approved}
            className="border-gray-200 bg-gray-50 text-gray-800"
          />

          <SummaryCard
            label="Terverifikasi"
            value={statusSummary.verified}
            className="border-blue-200 bg-blue-50 text-blue-800"
          />

          <SummaryCard
            label="Penawaran Dikirim"
            value={statusSummary.quotationSent}
            className="border-purple-200 bg-purple-50 text-purple-800"
          />

          <SummaryCard
            label="Negosiasi"
            value={statusSummary.negotiation}
            className="border-amber-200 bg-amber-50 text-amber-800"
          />

          <SummaryCard
            label="Ditolak"
            value={statusSummary.rejected}
            className="border-red-200 bg-red-50 text-red-800"
          />

          <SummaryCard
            label="Selesai"
            value={statusSummary.completed}
            className="border-emerald-200 bg-emerald-50 text-emerald-800"
          />
        </div>

        {/* SEARCH & FILTER */}
        <div className="mb-6 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_220px_auto]">
            <div>
              <label
                htmlFor="search"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Cari Permintaan
              </label>

              <input
                id="search"
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Nama, email, nomor HP, instansi, atau ID permintaan..."
                className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
              />
            </div>

            <div>
              <label
                htmlFor="status"
                className="mb-2 block text-sm font-medium text-stone-700"
              >
                Status
              </label>

              <select
                id="status"
                value={statusFilter}
                onChange={(event) => {
                  setStatusFilter(
                    event.target.value
                  );
                  setCurrentPage(1);
                }}
                className="min-h-11 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
              >
                <option value="all">
                  Semua Status
                </option>

                <option value="approved">
                  Disetujui
                </option>

                <option value="verified">
                  Terverifikasi
                </option>

                <option value="quotation_sent">
                  Penawaran Dikirim
                </option>

                <option value="negotiation">
                  Negosiasi
                </option>

                <option value="rejected">
                  Ditolak
                </option>

                <option value="completed">
                  Selesai
                </option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={resetFilters}
                className="min-h-11 w-full rounded-xl border border-stone-300 px-5 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100 md:w-auto"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 text-sm text-stone-500 sm:flex-row sm:items-center sm:justify-between">
            <span>
              Menampilkan{" "}
              <strong className="text-stone-800">
                {filteredRequests.length === 0
                  ? 0
                  : (currentPage - 1) *
                      itemsPerPage +
                    1}
              </strong>{" "}
              –{" "}
              <strong className="text-stone-800">
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredRequests.length
                )}
              </strong>{" "}
              dari{" "}
              <strong className="text-stone-800">
                {filteredRequests.length}
              </strong>{" "}
              permintaan
            </span>

            {(search ||
              statusFilter !== "all") && (
              <button
                type="button"
                onClick={resetFilters}
                className="text-left font-medium text-stone-700 hover:text-stone-900"
              >
                Hapus filter
              </button>
            )}
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center shadow-sm">
            <p className="text-stone-600">
              Memuat permintaan pembelian...
            </p>
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="font-medium text-red-700">
              {error}
            </p>
          </div>
        )}

        {/* MOBILE */}
        {!loading &&
          !error &&
          filteredRequests.length > 0 && (
            <>
              <div className="space-y-4 md:hidden">
                {paginatedRequests.map(
                  (request) => (
                    <PurchaseRequestMobileCard
                      key={request.id}
                      request={request}
                    />
                  )
                )}
              </div>

              {totalPages > 1 && (
                <div className="mt-4 flex items-center justify-between gap-3 md:hidden">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.max(page - 1, 1)
                      )
                    }
                    disabled={currentPage === 1}
                    className="min-h-11 flex-1 rounded-xl border border-stone-300 px-3 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ← Sebelumnya
                  </button>

                  <div className="shrink-0 rounded-xl bg-stone-100 px-4 py-3 text-sm font-semibold text-stone-700">
                    {currentPage} / {totalPages}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setCurrentPage((page) =>
                        Math.min(
                          page + 1,
                          totalPages
                        )
                      )
                    }
                    disabled={
                      currentPage === totalPages
                    }
                    className="min-h-11 flex-1 rounded-xl border border-stone-300 px-3 py-3 text-sm font-semibold text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Berikutnya →
                  </button>
                </div>
              )}
            </>
          )}

        {/* MOBILE EMPTY */}
        {!loading &&
          !error &&
          filteredRequests.length === 0 && (
            <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm md:hidden">
              <p className="font-medium text-stone-700">
                Tidak ada permintaan yang
                ditemukan.
              </p>

              <p className="mt-2 text-sm text-stone-500">
                Coba ubah kata pencarian atau
                filter status.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 min-h-11 rounded-xl bg-stone-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-stone-700"
              >
                Reset Filter
              </button>
            </div>
          )}

        {/* DESKTOP TABLE */}
        {!loading &&
          !error && (
            <div className="hidden overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="border-b border-stone-200 bg-stone-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-stone-700">
                        Pembeli
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-stone-700">
                        Kontak
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-stone-700">
                        Instansi
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-stone-700">
                        Status
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-stone-700">
                        Total
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-stone-700">
                        Tanggal
                      </th>

                      <th className="px-6 py-4 text-right text-sm font-semibold text-stone-700">
                        Aksi
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-stone-100">
                    {paginatedRequests.map(
                      (request) => (
                        <tr
                          key={request.id}
                          className="transition hover:bg-stone-50"
                        >
                          <td className="px-6 py-5">
                            <p className="font-semibold text-stone-900">
                              {request.full_name}
                            </p>

                            <p className="mt-1 text-sm text-stone-500">
                              {request.email}
                            </p>

                            <div className="mt-2 flex items-center gap-2">
                              <code
                                title={request.id}
                                className="truncate text-xs text-stone-400"
                              >
                                ID:{" "}
                                {formatRequestId(
                                  request.id
                                )}
                              </code>

                              <button
                                type="button"
                                onClick={() =>
                                  copyRequestId(
                                    request.id
                                  )
                                }
                                className="shrink-0 rounded-md border border-stone-200 px-2 py-1 text-xs font-medium text-stone-600 transition hover:bg-stone-100"
                                title="Salin ID permintaan"
                              >
                                {copiedRequestId ===
                                request.id
                                  ? "Tersalin"
                                  : "📋"}
                              </button>
                            </div>
                          </td>

                          <td className="px-6 py-5 text-sm text-stone-700">
                            {request.phone}
                          </td>

                          <td className="px-6 py-5 text-sm text-stone-700">
                            {request.organization ||
                              "-"}
                          </td>

                          <td className="px-6 py-5">
                            <StatusBadge
                              status={
                                request.status
                              }
                            />
                          </td>

                          <td className="px-6 py-5 text-sm font-medium text-stone-900">
                            {request.estimated_total !==
                            null
                              ? `Rp ${Number(
                                  request.estimated_total
                                ).toLocaleString(
                                  "id-ID"
                                )}`
                              : "Belum ditentukan"}
                          </td>

                          <td className="px-6 py-5 text-sm text-stone-600">
                            {new Date(
                              request.created_at
                            ).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </td>

                          <td className="px-6 py-5 text-right">
                            <Link
                              href={`/purchase-requests/${request.id}`}
                              className="inline-flex rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
                            >
                              Lihat Detail
                            </Link>
                          </td>
                        </tr>
                      )
                    )}

                    {filteredRequests.length ===
                      0 && (
                      <tr>
                        <td
                          colSpan={7}
                          className="px-6 py-12 text-center"
                        >
                          <p className="font-medium text-stone-700">
                            Tidak ada permintaan
                            yang ditemukan.
                          </p>

                          <p className="mt-1 text-sm text-stone-500">
                            Coba ubah kata pencarian
                            atau filter status.
                          </p>

                          <button
                            type="button"
                            onClick={
                              resetFilters
                            }
                            className="mt-4 rounded-lg bg-stone-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-stone-700"
                          >
                            Reset Filter
                          </button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* DESKTOP PAGINATION */}
              {filteredRequests.length > 0 &&
                totalPages > 1 && (
                  <div className="flex flex-col gap-4 border-t border-stone-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-stone-500">
                      Halaman{" "}
                      <span className="font-semibold text-stone-800">
                        {currentPage}
                      </span>{" "}
                      dari{" "}
                      <span className="font-semibold text-stone-800">
                        {totalPages}
                      </span>
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage(
                            (page) =>
                              Math.max(
                                page - 1,
                                1
                              )
                          )
                        }
                        disabled={
                          currentPage === 1
                        }
                        className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        ← Sebelumnya
                      </button>

                      <div className="flex items-center gap-1">
                        {Array.from(
                          {
                            length: totalPages,
                          },
                          (_, index) =>
                            index + 1
                        ).map((page) => (
                          <button
                            key={page}
                            type="button"
                            onClick={() =>
                              setCurrentPage(
                                page
                              )
                            }
                            className={`min-w-10 rounded-lg px-3 py-2 text-sm font-medium transition ${
                              currentPage === page
                                ? "bg-stone-900 text-white"
                                : "text-stone-700 hover:bg-stone-100"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setCurrentPage(
                            (page) =>
                              Math.min(
                                page + 1,
                                totalPages
                              )
                          )
                        }
                        disabled={
                          currentPage ===
                          totalPages
                        }
                        className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Berikutnya →
                      </button>
                    </div>
                  </div>
                )}
            </div>
          )}

        {!loading && !error && (
          <div className="mt-6 text-sm text-stone-500">
            Total permintaan:{" "}
            <span className="font-semibold text-stone-800">
              {requests.length}
            </span>
          </div>
        )}
      </div>
    </main>
  );
}