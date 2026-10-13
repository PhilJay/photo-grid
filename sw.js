// Keeps the app working offline. Photos are never cached, only the app files.
const CACHE = 'photo-grid-v3';
const APP_FILES = ['./', './index.html', './heic-worker.js', './vendor/libheif.js', './vendor/libheif.wasm', './manifest.webmanifest', './icon.svg', './assets/hero.jpg'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

// always try the network first so updates show up right away, use the cache when offline
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  if (event.request.method !== 'GET' || url.origin !== location.origin) return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    try {
      const response = await fetch(event.request);
      if (response.ok) cache.put(event.request, response.clone());
      return response;
    } catch {
      const cached = await cache.match(event.request, { ignoreSearch: true });
      if (cached) return cached;
      throw new Error('Offline and not cached');
    }
  }));
});
