const staticfiles = [
'/',
'/static/css/main.5ecd60fb.chunk.css',
'/static/css/main.5ecd60fb.chunk.css.map',
'/static/js/2.f6ece728.chunk.js',
'/static/js/2.f6ece728.chunk.js.LICENSE.txt',
'/static/js/2.f6ece728.chunk.js.map',
'/static/js/main.0300d442.chunk.js',
'/static/js/main.0300d442.chunk.js.map',
'/static/js/runtime-main.14c2b8ee.js',
'/static/js/runtime-main.14c2b8ee.js.map',
'/asset-manifest.json',
'/d&dlogo.png',
'/d&dlogo192.png',
'/d&dlogo512.png',
'/d&dlogo64.png',
'/index.html',
'/manifest.json',
'/precache-manifest.ac5fb48d69ea53bfcad2f8c45ed5eec6.js',
'/robots.txt',
'/service-worker.js',
'/sw.js'
];

const staticResourcescacheName = "static-cache";
const dynamicApicacheName = "api-response-cache";
const cachesToKeep = [staticResourcescacheName, dynamicApicacheName];


self.addEventListener('install', function (event) {
    console.log('[Installing Service Worker]');
    event.waitUntil(
        caches.open(staticResourcescacheName).then(function (cache) {
            return cache.addAll(
                staticfiles
            )
        })

    )
})

// cache then network fall back strategy

self.addEventListener('fetch', function (event) {

    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request).then(function (response) {
                    var responseClone = response.clone();
                    caches.open(staticResourcescacheName).then(function (cache) {
                        cache.put(event.request, responseClone);
                    })
                    return response;
                })
            }
        })
    );
        
})
