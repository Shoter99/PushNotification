
const cacheName = "v1"

const cachAssets = [
    'index.html',
    'aboutme.html',
    'contact.html',
    'main.js',
    'style.css'
]

self.addEventListener('install', e => {
    console.log("Service Worker: installed")

    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            console.log("Service Worker: Caching Files")
            cache.addAll(cachAssets)
            
        })
        .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', e => {
    console.log("Service Worker: activated")
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log("Service Worker: cleaning caches")
                        return caches.delete(cache)
                    }
                })
            ) 
        }
        )
    )
})

self.addEventListener('fetch', e => {
    console.log('Service Worker: Fetching')
    e.respondWith(
        fetch(e.request)
        .catch(() => caches.match(e.request))
    )
})
self.addEventListener('push', e => {
    const data = e.data.json()
    self.registration.showNotification(data.title, {
        body: 'You got push notification',
        icon: 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fsimpleicon.com%2Frocket.html&psig=AOvVaw2QNix_0cmWLQXfz2xBeqBj&ust=1620223811325000&source=images&cd=vfe&ved=2ahUKEwj35Y6XmrDwAhVM5LsIHQw8DGoQjRx6BAgAEAc'
    })
})