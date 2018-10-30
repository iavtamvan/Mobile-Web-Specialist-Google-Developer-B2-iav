var CACHE_NAME = 'my-site-cache-v4';
var urlsToCache = [
  // sesuaikan dengan project masing-masing
  '/',
  '/images/bg1.jpeg',
  '/images/bg2.jpeg',
  '/images/bg2.jpg',
  '/week2/index.html',
  '/week2/add2numbers.js',
  '/week3/index.html',
  '/week4/css/peta.css',
  '/week4/data/peta.json',
  '/week4/images/ikan_bakar.jpg',
  '/week4/images/resto_spanyol.jpg',
  '/week4/images/seafood.jpeg',
  '/week4/images/steak.jpg',
  '/week4/images/warkop.jpg',
  '/week4/js/peta.js',
  '/week4/'
];

//install service worker
self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
        console.log('in install serviceWorker.... cache opened');
        return cache.addAll(urlsToCache);
      })
  );
});

// fetch
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// activate
self.addEventListener('activate', function(event) {

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName){
          return cacheName != CACHE_NAME;
        }).map(function(cacheName){
          return caches.delete(cacheName);
        })
      );
    })
  );
});