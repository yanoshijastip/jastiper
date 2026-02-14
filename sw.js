// GANTI ANGKA VERSI INI SETIAP KALI ANDA MENGUPDATE FILE HTML/CSS/JS
const CACHE_NAME = 'yanoshi-store-v2'; 

const urlsToCache = [
  './index.html',
  './logo.png'
];

// Install Service Worker & Simpan Cache Baru
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Memaksa service worker baru langsung aktif
});

// Bersihkan Cache Lama jika ada versi baru
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Menghapus cache lama:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Strategi: Network First, Fallback to Cache
// Selalu coba ambil dari internet dulu agar data paling fresh, jika tidak ada sinyal baru pakai cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request);
    })
  );
});
