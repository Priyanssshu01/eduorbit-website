// ===================================================================
// EDUORBIT — SERVICE WORKER (Version 1.5 - Optimized & Self-Updating)
// ===================================================================
// This service worker implements active cache cleanup and stale-while-revalidate
// strategies to ensure users never get stuck with an old or broken cached version.

const CACHE_NAME = 'eduorbit-v2.0'; // Incremented to force-bust old v1 cache
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './index.css',
  './app.js',
  './data.js',
  './marketing.css',
  './marketing.js',
  './manifest.json'
];

// --- 1. INSTALL: Cache all essential core assets ---
self.addEventListener('install', event => {
  self.skipWaiting(); // Force the waiting service worker to become active immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// --- 2. ACTIVATE: Clear out old versions and update immediately ---
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // Immediately start controlling all open clients/tabs
    })
  );
});

// --- 3. FETCH: Stale-While-Revalidate Strategy ---
// Returns cached assets instantly for speed, but fetches new updates in the background
// to refresh the cache dynamically. Main HTML is fetched with Network-First to avoid stale pages.
self.addEventListener('fetch', event => {
  const requestUrl = new URL(event.request.url);

  // For the main HTML document, always try the Network first so updates are instant
  if (event.request.mode === 'navigate' || requestUrl.pathname.endsWith('index.html') || requestUrl.pathname === '/') {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          return caches.match(event.request); // Fallback to cache if completely offline
        })
    );
    return;
  }

  // Stale-While-Revalidate for other static assets (CSS, JS, Images)
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // Fetch a fresh version in the background to update the cache
        fetch(event.request).then(networkResponse => {
          if (networkResponse.status === 200) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {/* Ignore network failures in background */});

        return cachedResponse; // Return the fast cached version immediately
      }

      return fetch(event.request); // Not in cache, fetch normally
    })
  );
});
