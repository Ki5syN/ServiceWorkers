const FETCH_PRIORITY_URLS = ['/', '/index.html', '/style.css', '/js/app.js'];
const CACHE_NAME = 'my-best-cache';

self.addEventListener('install', (event) => {
  console.log('Установлен');
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(FETCH_PRIORITY_URLS);
      })
      .then(() => self.skipWaiting()),
  );
});

async function fetchPriorityThenCache(event) {
  let response;
  try {
    if (event.request.url.includes('/api/news')) {
      response = await fetch(new Request(event.request, { cache: 'no-store' }));
    } else {
      response = await fetch(event.request);
    }
  } catch (error) {
    const cacheResponse = await caches.match(event.request);
    if (cacheResponse) {
      return cacheResponse;
    }

    throw error;
  }

  if (event.request.method === 'GET') {
    const cache = await caches.open('my-best-cache');
    cache.put(event.request, response.clone());
  }

  return response;
}

self.addEventListener('activate', (event) => {
  console.log('Активирован');
  self.clientsClaim();
});

self.addEventListener('fetch', (event) => {
  console.log('Происходит запрос на сервер');
  const url = new URL(event.request.url);

  event.respondWith(fetchPriorityThenCache(event)); // потому что ожидает результата
});
