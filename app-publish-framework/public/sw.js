const staticResourcescacheName = "static-cache-v9";
const dynamicApicacheName = "api-response-cache-v9";

const cachesToKeep = [staticResourcescacheName, dynamicApicacheName];


self.addEventListener('install', function (event) {
    console.log('[Installing Service Worker]');
    event.waitUntil(
        caches.open(staticResourcescacheName).then(function (cache) {
            return cache.addAll(
                [
                    '/',
                    '/index.html',
                    '/sw.js',
                    // '/static/js/5.3dcb6a0c.chunk.js',
                    // '/static/js/3.8ccdfea3.chunk.js',
                    // '/static/js/0.afbf6e2c.chunk.js',
                    // '/static/js/4.e3a5bdd7.chunk.js',
                    // '/static/js/6.48aa2b15.chunk',
                    // '/static/js/main.76beb3ca.chunk.js',
                    // '/static/js/runtime-main.61cd52a6.js',
                    // '/static/css/4.30bdaaf4.chunk.css',
                    // '/static/css/6.032eaafd.chunk.css',
                    // '/static/css/main.92f03a12.chunk.css',
                    '//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css',
                    '/favicon.ico',
                    '/manifest.json',
                    // '/HotSpot.json',
                    '/logo192.png',
                    '/logo512.png',
                ]
            )
        })

    )
})


const AllowedContentTypes = ['.js', '.json', '.css', '.ico', '.png']

self.addEventListener('activate', function (event) {

    event.waitUntil(
        caches.keys().then(function (keyList) {
            return Promise.all(keyList.map(function (key) {
                if (cachesToKeep.indexOf(key) === -1) {
                    return caches.delete(key);
                }
            }))
        })
    );



    return self.clients.claim();
});


self.addEventListener('fetch', function (event) {

    // Donot Cache Any POST Request 
    if (event.request.method === "POST") {
        event.respondWith(fetch(event.request));
    }

    // Do not cache google analytics
    else if (event.request.url.indexOf("google-analytics") > 0) {

        event.respondWith(fetch(event.request));

    }
    // Api Requests to GateWay follow a Network first Policy else fall back to cache
    else if (event.request.url.indexOf("symptomsinsights.com:8002") > 0) {

        event.respondWith(
            fetch(event.request).then(function (response) {
                var responseClone = response.clone();
                caches.open(dynamicApicacheName).then(function (cache) {
                    cache.put(event.request, responseClone);
                })
                return response;
            }).catch(function (err) {
                console.log('[Error Fetching]');
                return caches.match(event.request).then(function (response) {
                    return response || err;
                });
            })
        );
    }


    
    else if (event.request.url.indexOf("symptomsinsights.com") > 0) {
        // Follow a network first policy for the News Report then fallback to Cache 
        if(event.request.url.indexOf("NewsReports.json") > 0) {
            event.respondWith(
                fetch(event.request).then(function (response) {
                    var responseClone = response.clone();
                    caches.open(dynamicApicacheName).then(function (cache) {
                        cache.put(event.request, responseClone);
                    })
                    return response;
                }).catch(function (err) {
                    console.log('[Error Fetching]');
                    return caches.match(event.request).then(function (response) {
                        return response || err;
                    });
                })
            );
        }
        // Static Files Should go for static cache if not go and fetch the js and add it
    
        else {
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
        }
        


    }
    // Everything else should go for a Network First Policy
    else {
        event.respondWith(fetch(event.request));

    }


})

