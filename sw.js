const CACHE = "huwords-v5";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./worldList_1.JSON",
  "./FruitsAndVegetables.JSON"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
