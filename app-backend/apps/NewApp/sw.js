const createdAt = 'Fri, 09 Oct 2020 19:09:28 GMT';
const staticfiles = [
'/',
'/static/css/main.5ecd60fb.chunk.css',
'/static/css/main.5ecd60fb.chunk.css.map',
'/static/js/2.6bf76b6b.chunk.js',
'/static/js/2.6bf76b6b.chunk.js.LICENSE.txt',
'/static/js/2.6bf76b6b.chunk.js.map',
'/static/js/main.d059d866.chunk.js',
'/static/js/main.d059d866.chunk.js.map',
'/static/js/runtime-main.14c2b8ee.js',
'/static/js/runtime-main.14c2b8ee.js.map',
'/asset-manifest.json',
'/favicon.ico',
'/index.html',
'/logo192.png',
'/logo512.png',
'/manifest.json',
'/precache-manifest.397284c81346187efe8b621263f50541.js',
'/robots.txt',
'/service-worker.js',
'/sw.js',
'/designs',
'/designs/AppDesign.json',
'/workFlows',
'/workFlows/appInit.json',
'/workFlows/wf1.json'
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
