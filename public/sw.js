const VERSION = '1.0';

// install event

self.addEventListener('install', () => {
  console.log('[Service-Worker] Install');
});

// activate event
self.addEventListener('activate', () => {
  console.log('[Service-Worker] Activate');
});

// fetch event
self.addEventListener('fetch', event => {
  // console.log('[Service-Worker] fetch', event.request);
});
