const publicVapidKey =
    'BHHfl4wvhwquAgkFfaavBdM0UqMmbZor8D6CwhVGk3xd90y0ue9Z3UxL46M7ej1S9aBSCtkFnDHM1lRn8aotz7E'

const btn = document.getElementById('subscribeBtn')

btn.addEventListener('click', send)

    async function send()
    {
        //register worker
        const register = await navigator.serviceWorker.register('/sw_cached_pages.js', {
            scope: '/'
        })
        //register push
        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: publicVapidKey
        })
        //send push
        await fetch('/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'content-type': 'application/json'
            }
        })

    }