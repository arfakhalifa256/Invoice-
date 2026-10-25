const CACHE_NAME = "eb-baja-v1";
const FILES = ["./","./index.html","./preview.html","./manifest.json","./img/logo.png","./img/stempel.png"];
self.addEventListener("install", e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES)))});
self.addEventListener("fetch", e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))});

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  // JANGAN cache Firebase & Google Fonts, ini yang bikin gagal install
  if (event.request.url.includes("firebase") || event.request.url.includes("googleapis") || event.request.url.includes("gstatic")) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(res => res || fetch(event.request))
  );
});