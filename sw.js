const CACHE = "huwords-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.json",
  // добавь сюда те JSON, которые реально используешь:
  "./worldList_1.JSON",
  "./Группа Восприятие (видеть, слышать).JSON",
  "./Группа Движение и транспорт.JSON",
  "./Группа Еда и напитки.JSON"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
