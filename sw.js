self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open('yanoshi-store').then((cache) => cache.addAll([
      './index.html',
      './logoappjastiper.png',
    ])),
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
