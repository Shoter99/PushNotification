
if(navigator.serviceWorker){
    window.addEventListener('load', () => {
        navigator.serviceWorker
        .register('sw_cached_pages.js')
        .then(reg => console.log('Service Worker Registered'))
        .catch(err => console.log(`Service Worker: Error ${err}`))
    })    
}
self.addEventListener('offline', () => {
        alert('No Internet connection, loading cached page...')
})
self.addEventListener('online', () => {
        alert('Internet is back')
})
