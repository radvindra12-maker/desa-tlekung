/**
 * Service Worker KHUSUS Dashboard Admin (Giri Murti Admin PWA).
 *
 * PENTING: file ini didaftarkan dengan scope eksplisit "/purchase-requests"
 * dari lib/admin-pwa/useAdminServiceWorker.ts, yang HANYA dipanggil ketika
 * AdminPwaProvider mendeteksi pathname diawali "/purchase-requests".
 * Service worker ini TIDAK PERNAH aktif di halaman publik, /purchase,
 * atau /login.
 *
 * ATURAN CACHING (wajib dipatuhi, jangan diubah sembarangan):
 *
 * 1. Method selain GET (POST/PATCH/PUT/DELETE) TIDAK PERNAH diintersep —
 *    selalu diteruskan langsung ke network, tidak pernah masuk cache.
 *
 * 2. Request ke Supabase (*.supabase.co) dan ke /api/* SELALU
 *    network-only. Tidak ada fallback cache untuk data admin,
 *    supaya dashboard tidak pernah menampilkan data basi/authenticated
 *    data yang ter-cache.
 *
 * 3. Static asset build Next.js yang sudah di-hash (/_next/static/*)
 *    memakai cache-first + fallback network (bukan cache-only):
 *    - Dicek di cache dulu karena nama file berubah tiap build
 *      (immutable by filename), jadi aman dan cepat.
 *    - Kalau TIDAK ada di cache (deployment baru, cache lama sudah
 *      dibersihkan saat activate), selalu fallback fetch ke network —
 *      tidak pernah gagal diam-diam.
 *    - Icon admin (/icons/*) pakai strategi sama.
 *
 * 4. Navigasi dokumen (HTML) SELALU network-only. Tidak ada fallback
 *    ke cache HTML lama — mencegah stale chunk/CSS/JS mismatch setelah
 *    deployment baru. Kalau benar-benar offline, tampilkan halaman
 *    offline sintetis yang di-generate langsung di sini (bukan dari
 *    cache), supaya tidak ada admin data atau markup basi yang bocor.
 *
 * 5. CACHE_VERSION WAJIB di-bump manual (v1 -> v2 -> dst) setiap kali
 *    ada deployment yang mengubah static asset. Saat SW baru "activate",
 *    semua cache dengan versi lama otomatis dihapus.
 */

const CACHE_VERSION = "giri-murti-admin-v1";
const STATIC_CACHE = `${CACHE_VERSION}-static`;

const NEVER_CACHE_HOSTS = ["supabase.co"];

self.addEventListener("install", () => {
  // Sengaja TIDAK memanggil self.skipWaiting() di sini.
  // Versi baru harus menunggu konfirmasi user lewat tombol
  // "Perbarui" (lihat pesan SKIP_WAITING di bawah), supaya
  // tidak ada auto-reload paksa/tiba-tiba dan tidak ada
  // infinite reload loop.
});

self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(
            (name) =>
              name.startsWith("giri-murti-admin-") &&
              name !== STATIC_CACHE
          )
          .map((name) => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

function isSupabaseRequest(url) {
  return NEVER_CACHE_HOSTS.some((host) => url.hostname.endsWith(host));
}

function isAdminApiRequest(url) {
  return url.pathname.startsWith("/api/");
}

function isHashedStaticAsset(url) {
  // Next.js build output, nama file sudah mengandung content-hash,
  // jadi aman di-cache selama-lamanya per versi build.
  return url.pathname.startsWith("/_next/static/");
}

function isAdminIcon(url) {
  return url.pathname.startsWith("/icons/");
}

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // 1) Method selain GET: jangan pernah diintersep sama sekali.
  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // 2) Data Supabase & API admin: network-only, tidak pernah masuk cache,
  //    tidak ada fallback cache dalam kondisi apa pun.
  if (isSupabaseRequest(url) || isAdminApiRequest(url)) {
    event.respondWith(fetch(request));
    return;
  }

  // 3) Static asset hasil build (hashed) & icon admin:
  //    cache-first dengan fallback network eksplisit.
  if (isHashedStaticAsset(url) || isAdminIcon(url)) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(STATIC_CACHE);
        const cached = await cache.match(request);

        if (cached) {
          return cached;
        }

        // Fallback network wajib ada — cache miss (mis. setelah
        // deployment baru & cache lama dibersihkan) tidak boleh gagal.
        try {
          const response = await fetch(request);
          if (response.ok) {
            cache.put(request, response.clone());
          }
          return response;
        } catch (error) {
          // Benar-benar offline dan tidak ada di cache: teruskan error,
          // biarkan browser menampilkan kegagalan asset secara normal.
          throw error;
        }
      })()
    );
    return;
  }

  // 4) Navigasi dokumen HTML: network-only. TIDAK ADA fallback ke cache
  //    HTML lama, supaya tidak pernah terjadi stale chunk/CSS/JS mismatch
  //    setelah deployment baru. Kalau offline, generate halaman offline
  //    sintetis langsung (bukan dari cache).
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          return await fetch(request);
        } catch {
          return new Response(
            "<!DOCTYPE html><html lang='id'><head><meta charset='utf-8'>" +
              "<meta name='viewport' content='width=device-width, initial-scale=1'>" +
              "<title>Offline — Giri Murti Admin</title></head>" +
              "<body style='font-family:system-ui;padding:2rem;text-align:center;color:#0D530E;'>" +
              "<h1>Anda sedang offline</h1>" +
              "<p>Sambungkan kembali ke internet untuk membuka dashboard admin.</p>" +
              "</body></html>",
            {
              status: 503,
              headers: { "Content-Type": "text/html; charset=utf-8" },
            }
          );
        }
      })()
    );
    return;
  }

  // 5) Selain kasus di atas: biarkan browser menangani secara default
  //    (tidak diintersep, tidak dicache).
});
