// ===================================================================
// EDUORBIT — SERVICE WORKER (Version 3.0 - Network-First for JS/Data)
// ===================================================================
// v3.0 changes:
//   - Cache busted to v3.0 → all old caches cleared on next visit
//   - data.js & app.js use NETWORK-FIRST (always fresh from server)
//   - Static assets (CSS, images) use stale-while-revalidate

const CACHE_NAME = 'eduorbit-v3.0';

// Only cache truly static assets — NOT data.js or app.js
const ASSETS_TO_CACHE = [
  './index.css',
  './marketing.css',
  './marketing.js',
  './manifest.json'
];

// Files that must ALWAYS come from network (frequently updated)
const NETWORK_FIRST_FILES = [
  'data.js',
  'app.js',
  'admin.js',
  'index.html',
  'admin.html'
];

// --- 1. INSTALL: Cache only static assets ---
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// --- 2. ACTIVATE: Clear ALL old caches immediately ---
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      return self.clients.claim();
    })
  );
});

// --- 3. FETCH Strategy ---
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);
  const filename = url.pathname.split('/').pop();

  // NETWORK-FIRST: HTML pages, JS files, data.js — always fresh
  const isNetworkFirst =
    event.request.mode === 'navigate' ||
    url.pathname === '/' ||
    url.pathname.endsWith('index.html') ||
    url.pathname.endsWith('admin.html') ||
    NETWORK_FIRST_FILES.some(f => url.pathname.endsWith(f));

  if (isNetworkFirst) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // Don't cache these — always fetch from network
          return networkResponse;
        })
        .catch(() => {
          // Fallback to cache ONLY if completely offline
          return caches.match(event.request);
        })
    );
    return;
  }

  // STALE-WHILE-REVALIDATE: CSS, images, fonts (rarely change)
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Update cache in background
        fetch(event.request).then(networkResponse => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {});

        return cachedResponse;
      }

      return fetch(event.request);
    })
  );
});
