/* App shell cache. The reference corpus ships inside app.js and the API is
   never cached, so an installed Polarity opens and runs offline on the built-in
   theses, and reaches the network only for live analysis. */

const VERSION = "polarity-v1";
const SHELL = [
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
  "/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Analysis must never come from cache — a stale scheme is worse than none.
  if (url.pathname.startsWith("/api/")) return;

  // Navigations: try the network so a deployed update lands, fall back to the
  // cached shell when offline.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(VERSION).then((c) => c.put("/index.html", copy));
          return response;
        })
        .catch(() => caches.match("/index.html").then((r) => r || Response.error()))
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(
      (hit) =>
        hit ||
        fetch(request).then((response) => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(VERSION).then((c) => c.put(request, copy));
          }
          return response;
        })
    )
  );
});
