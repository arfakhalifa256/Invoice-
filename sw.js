const CACHE_NAME = "eb-baja-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./img/logo.png",
  "./img/icon-72.png",
  "./img/icon-96.png",
  "./img/icon-192.png",
  "./img/icon-512.png",
  "./img/stempel.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});