const CACHE_NAME = "eb-baja-v4";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // cache satu-satu, kalau gagal 1 gak bikin gagal semua
      return cache.addAll([
        "./index.html",
        "./manifest.json",
        "./img/logo.png",
        "./img/icon-192.png",
        "./img/icon-512.png"
      ]).catch(err => {
        console.log("Cache gagal sebagian, tapi lanjut", err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});