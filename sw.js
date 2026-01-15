const CACHE = "huwords-v16";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json"
  // JSON файлы не кэшируем, всегда загружаем свежие из сети
];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  
  // Для JSON файлов всегда запрашиваем из сети, не из кэша
  if (url.pathname.endsWith('.json')) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }
  
  // Для остальных файлов используем кэш, если есть
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
