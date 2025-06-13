const cacheName = 'v1.0';

self.addEventListener("install", (event) => {
    event.waitUntil(
      caches.open(cacheName).then((cache) => cache.addAll([
        "./index.html",
      ]))
    );
    self.skipWaiting();
  });

self.addEventListener("fetch",(event) => {
    event.respondWith(
        caches.match(event.request)
        .then(response => response || fetch(event.request))
        .catch(() => new Response("Network Error", {status: 408}))
    )
})