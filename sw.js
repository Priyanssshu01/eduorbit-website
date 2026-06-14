// ===================================================================
// EDUORBIT — SERVICE WORKER v3.0 (NUCLEAR CACHE BUSTER)
// ===================================================================
// Strategy: NETWORK FIRST for everything.
// Koi bhi cached file nahi serve hogi jab tak network available hai.
// Jaise hi GitHub pe push hoga, SABKE phone pe update aa jayega.

const CACHE_NAME = 'eduorbit-v3.6'; // Version bump = old cache deleted instantly

// --- 1. INSTALL: Skip waiting immediately ---
self.addEventListener('install', event => {
  self.skipWaiting(); // New SW turant active ho jata hai
  event.waitUntil(caches.open(CACHE_NAME)); // Just open cache, don't pre-cache
});

// --- 2. ACTIVATE: Purane SAARE caches delete karo ---
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          // Koi bhi purana cache — delete!
          console.log('[SW v3.6] Deleting old cache:', cache);
          return caches.delete(cache);
        })
      );
    }).then(() => {
      // Turant SABKE open tabs/phones ko control lo
      return self.clients.claim();
    }).then(() => {
      // Sabko bolo page refresh karo
      return self.clients.matchAll({ type: 'window' }).then(clients => {
        clients.forEach(client => {
          client.postMessage({ type: 'SW_UPDATED', version: '3.6' });
        });
      });
    })
  );
});

// --- 3. FETCH: NETWORK FIRST — hamesha fresh content ---
self.addEventListener('fetch', event => {
  // Only handle same-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        // Network se mila — fresh response return karo (cache mat karo)
        return networkResponse;
      })
      .catch(() => {
        // Sirf offline hone par cache use karo (fallback only)
        return caches.match(event.request).then(cached => {
          return cached || new Response(
            '<h1>You are offline</h1><p>Please check your internet connection.</p>',
            { headers: { 'Content-Type': 'text/html' } }
          );
        });
      })
  );
});
