// Service worker for We Protect Us.
// Privacy note: authenticated API responses are intentionally NEVER written to
// the cache, so personal data does not linger on shared/seized devices. Only the
// static application shell and the offline fallback page are cached.

const CACHE_NAME = 'wpu-shell-v2';
const OFFLINE_URL = '/offline.html';

const STATIC_FILES = ['/', '/offline.html', '/manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_FILES))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // Never cache Supabase / API traffic — it may contain personal data.
  // Serve from network; if offline, hand back an empty result the app understands.
  if (url.hostname.endsWith('.supabase.co')) {
    event.respondWith(
      fetch(request).catch(
        () =>
          new Response(JSON.stringify({ data: [], error: null, offline: true }), {
            headers: { 'Content-Type': 'application/json' },
          }),
      ),
    );
    return;
  }

  // Only handle our own origin for caching.
  if (url.origin !== self.location.origin) return;

  // App navigations: network-first, fall back to cached shell, then offline page.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() =>
        caches.match('/').then((cached) => cached || caches.match(OFFLINE_URL)),
      ),
    );
    return;
  }

  // Static assets: cache-first, then revalidate in the background.
  event.respondWith(
    caches.match(request).then((cached) => {
      const network = fetch(request)
        .then((response) => {
          if (response && response.status === 200 && response.type === 'basic') {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return response;
        })
        .catch(() => cached);
      return cached || network;
    }),
  );
});

self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    // The application layer (useOfflineSync) performs the actual replay once the
    // page regains connectivity; nothing sensitive is stored in the SW here.
  }
});

self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Emergency Alert',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [200, 100, 200],
    tag: 'emergency-alert',
    requireInteraction: true,
    actions: [
      { action: 'view', title: 'View Details' },
      { action: 'dismiss', title: 'Dismiss' },
    ],
  };
  event.waitUntil(self.registration.showNotification('Emergency Alert', options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'view') {
    event.waitUntil(self.clients.openWindow('/disaster-preparedness'));
  }
});
