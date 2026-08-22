/**
 * Service Worker KHUSUS Dashboard Admin (Giri Murti Admin PWA).
 *
 * Scope: /purchase-requests
 *
 * Caching:
 * - Non-GET: network default, tidak diintersep.
 * - Supabase/API: network-only.
 * - /_next/static + /icons: cache-first.
 * - HTML navigation: network-only + offline synthetic page.
 *
 * Push:
 * - Menampilkan notifikasi permintaan pembelian baru.
 * - Klik notifikasi membuka /purchase-requests/[id].
 */

const CACHE_VERSION =
  "giri-murti-admin-v1";

const STATIC_CACHE =
  `${CACHE_VERSION}-static`;

const NEVER_CACHE_HOSTS = [
  "supabase.co",
];

self.addEventListener(
  "install",
  () => {
    // Tidak skipWaiting otomatis.
  }
);

self.addEventListener(
  "message",
  (event) => {
    if (
      event.data?.type ===
      "SKIP_WAITING"
    ) {
      self.skipWaiting();
    }
  }
);

self.addEventListener(
  "activate",
  (event) => {
    event.waitUntil(
      (async () => {
        const cacheNames =
          await caches.keys();

        await Promise.all(
          cacheNames
            .filter(
              (name) =>
                name.startsWith(
                  "giri-murti-admin-"
                ) &&
                name !== STATIC_CACHE
            )
            .map((name) =>
              caches.delete(name)
            )
        );

        await self.clients.claim();
      })()
    );
  }
);

/* =========================================================
   PUSH NOTIFICATION
========================================================= */

self.addEventListener(
  "push",
  (event) => {
    event.waitUntil(
      (async () => {
        let payload = {};

        try {
          if (event.data) {
            payload =
              event.data.json();
          }
        } catch {
          try {
            payload = {
              body: event.data?.text() ?? "",
            };
          } catch {
            payload = {};
          }
        }

        const requestId =
          typeof payload.requestId ===
          "string"
            ? payload.requestId
            : null;

        const title =
          typeof payload.title ===
          "string"
            ? payload.title
            : "Permintaan Pembelian Baru";

        const body =
          typeof payload.body ===
          "string"
            ? payload.body
            : "Ada permintaan pembelian baru.";

        const url =
          requestId
            ? `/purchase-requests/${encodeURIComponent(
                requestId
              )}`
            : "/purchase-requests";

        await self.registration.showNotification(
          title,
          {
            body,
            icon: "/icons/admin-icon-192.png",
            badge: "/icons/admin-icon-192.png",
            tag: requestId
              ? `purchase-request-${requestId}`
              : "purchase-request-general",
            renotify: false,
            requireInteraction: true,
            vibrate: [
              200,
              100,
              200,
            ],
            data: {
              requestId,
              url,
            },
          }
        );
      })()
    );
  }
);

self.addEventListener(
  "notificationclick",
  (event) => {
    event.notification.close();

    event.waitUntil(
      (async () => {
        const notificationData =
          event.notification
            .data ?? {};

        const targetUrl =
          typeof notificationData.url ===
          "string"
            ? new URL(
                notificationData.url,
                self.location.origin
              ).href
            : new URL(
                "/purchase-requests",
                self.location.origin
              ).href;

        const windowClients =
          await self.clients.matchAll({
            type: "window",
            includeUncontrolled: true,
          });

        for (const client of windowClients) {
          try {
            await client.navigate(
              targetUrl
            );

            await client.focus();

            return;
          } catch {
            // Lanjut ke client berikutnya.
          }
        }

        await self.clients.openWindow(
          targetUrl
        );
      })()
    );
  }
);

/* =========================================================
   CACHE HELPERS
========================================================= */

function isSupabaseRequest(url) {
  return NEVER_CACHE_HOSTS.some(
    (host) =>
      url.hostname.endsWith(host)
  );
}

function isAdminApiRequest(url) {
  return url.pathname.startsWith(
    "/api/"
  );
}

function isHashedStaticAsset(url) {
  return url.pathname.startsWith(
    "/_next/static/"
  );
}

function isAdminIcon(url) {
  return url.pathname.startsWith(
    "/icons/"
  );
}

/* =========================================================
   FETCH
========================================================= */

self.addEventListener(
  "fetch",
  (event) => {
    const { request } = event;

    if (request.method !== "GET") {
      return;
    }

    const url = new URL(
      request.url
    );

    if (
      isSupabaseRequest(url) ||
      isAdminApiRequest(url)
    ) {
      event.respondWith(
        fetch(request)
      );

      return;
    }

    if (
      isHashedStaticAsset(url) ||
      isAdminIcon(url)
    ) {
      event.respondWith(
        (async () => {
          const cache =
            await caches.open(
              STATIC_CACHE
            );

          const cached =
            await cache.match(request);

          if (cached) {
            return cached;
          }

          try {
            const response =
              await fetch(request);

            if (response.ok) {
              cache.put(
                request,
                response.clone()
              );
            }

            return response;
          } catch (error) {
            throw error;
          }
        })()
      );

      return;
    }

    if (
      request.mode ===
      "navigate"
    ) {
      event.respondWith(
        (async () => {
          try {
            return await fetch(
              request
            );
          } catch {
            return new Response(
              "<!DOCTYPE html><html lang='id'>" +
                "<head>" +
                "<meta charset='utf-8'>" +
                "<meta name='viewport' content='width=device-width, initial-scale=1'>" +
                "<title>Offline — Giri Murti Admin</title>" +
                "</head>" +
                "<body style='font-family:system-ui;padding:2rem;text-align:center;color:#0D530E;'>" +
                "<h1>Anda sedang offline</h1>" +
                "<p>Sambungkan kembali ke internet untuk membuka dashboard admin.</p>" +
                "</body>" +
                "</html>",
              {
                status: 503,
                headers: {
                  "Content-Type":
                    "text/html; charset=utf-8",
                },
              }
            );
          }
        })()
      );

      return;
    }
  }
);