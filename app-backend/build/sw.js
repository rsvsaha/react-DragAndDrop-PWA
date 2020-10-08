const staticfiles = [
'/',
'/designs/App1.json',
'/static/css/main.dba01f89.chunk.css',
'/static/css/main.dba01f89.chunk.css.map',
'/static/js/2.a6281fe6.chunk.js',
'/static/js/2.a6281fe6.chunk.js.LICENSE.txt',
'/static/js/2.a6281fe6.chunk.js.map',
'/static/js/main.5a57e691.chunk.js',
'/static/js/main.5a57e691.chunk.js.map',
'/static/js/runtime-main.14c2b8ee.js',
'/static/js/runtime-main.14c2b8ee.js.map',
'/workFlows/appInit.json',
'/workFlows/wf1.json',
'/asset-manifest.json',
'/favicon.ico',
'/index.html',
'/logo192.png',
'/logo512.png',
'/manifest.json',
'/precache-manifest.e196f5597f70f53384e420d0c62a11cf.js',
'/robots.txt',
'/service-worker.js',
'/sw.js'
]


const staticResourcescacheName = "static-cache-v9";
const dynamicApicacheName = "api-response-cache-v9";

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
