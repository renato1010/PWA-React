const CACHE_NAME = 'V7';
const STATIC_PATHS = [
  '/',
  '/offline.html',
  '/assets/favicon-32x32.png',
  '/assets/favicon-16x16.png'
];
// install event
self.addEventListener('install', installEvent => {
  console.log('[Service-Worker] Install');
  installEvent.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      fetch('asset-manifest.json').then(response => {
        if (response.ok) {
          response.json().then(manifest => {
            const urls = Object.keys(manifest).map(key => manifest[key]);
            urls.push(...STATIC_PATHS);
            cache.addAll(urls);
          });
        }
      });
    })
  );
});

// activate event
self.addEventListener('activate', activateEvent => {
  console.log('[Service-Worker] Activate');
  activateEvent.waitUntil(
    caches.keys().then(keyList => {
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// fetch event
self.addEventListener('fetch', fetchEvent => {
  const request = fetchEvent.request;
  fetchEvent.respondWith(
    caches
      .match(request)
      .then(response => {
        return (
          response ||
          fetch(request)
            .then(res => {
              caches.open(CACHE_NAME).then(cache => {
                cache.put(request, res);
              });
              return res.clone();
            })
            .catch(err => {
              console.error('[SW] cache in fetch error');
              return caches.open(CACHE_NAME).then(cache => {
                if (request.headers.get('accept').includes('text/html')) {
                  return cache.match('/offline.html');
                }
                if (request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
                  return cache.match('/assets/android-chrome-256x256.png');
                }
              });
            })
        );
      })
      .catch(error => console.log(error))
  );
});
