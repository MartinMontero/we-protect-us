
const CACHE_NAME = 'emergency-prep-v1';
const OFFLINE_URL = '/offline.html';

// Files to cache for offline use
const STATIC_FILES = [
  '/',
  '/disaster-preparedness',
  '/offline.html',
  '/manifest.json',
  // Add critical CSS and JS files
];

// Install event - cache static files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => {
        self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      self.clients.claim();
    })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Handle API requests
  if (event.request.url.includes('/rest/v1/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // If online, cache the response and return it
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          // If offline, try to serve from cache
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              // Return offline data structure for critical endpoints
              return new Response(JSON.stringify({
                data: [],
                error: null,
                offline: true
              }), {
                headers: { 'Content-Type': 'application/json' }
              });
            });
        })
    );
    return;
  }

  // Handle page requests
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // If both cache and network fail, show offline page
        return caches.match(OFFLINE_URL);
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', event => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notification handling
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'Emergency Alert',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    vibrate: [200, 100, 200],
    tag: 'emergency-alert',
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'View Details'
      },
      {
        action: 'dismiss',
        title: 'Dismiss'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Emergency Alert', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/disaster-preparedness')
    );
  }
});

// Function to sync offline data when connection is restored
async function doBackgroundSync() {
  try {
    // Get stored offline data
    const cache = await caches.open(CACHE_NAME);
    const offlineData = await cache.match('/offline-data');
    
    if (offlineData) {
      const data = await offlineData.json();
      
      // Sync safety check-ins
      if (data.checkins) {
        for (const checkin of data.checkins) {
          await syncCheckin(checkin);
        }
      }
      
      // Sync damage reports
      if (data.reports) {
        for (const report of data.reports) {
          await syncDamageReport(report);
        }
      }
      
      // Clear offline data after successful sync
      await cache.delete('/offline-data');
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

async function syncCheckin(checkin) {
  try {
    const response = await fetch('/rest/v1/safety_checkins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${checkin.token}`
      },
      body: JSON.stringify(checkin.data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to sync checkin');
    }
  } catch (error) {
    console.error('Error syncing checkin:', error);
    // Re-store for later retry
    throw error;
  }
}

async function syncDamageReport(report) {
  try {
    const response = await fetch('/rest/v1/damage_reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${report.token}`
      },
      body: JSON.stringify(report.data)
    });
    
    if (!response.ok) {
      throw new Error('Failed to sync damage report');
    }
  } catch (error) {
    console.error('Error syncing damage report:', error);
    throw error;
  }
}
