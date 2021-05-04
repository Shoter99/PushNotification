const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')
const req = require('dotenv/config')

const privateVapidKey = process.env.SECRET_VAPID_KEY

const app = express()

app.use(express.static(path.join(__dirname, 'client')))

app.use(bodyParser.json())
const publicVapidKey =
    'BHHfl4wvhwquAgkFfaavBdM0UqMmbZor8D6CwhVGk3xd90y0ue9Z3UxL46M7ej1S9aBSCtkFnDHM1lRn8aotz7E'
webpush.setVapidDetails('mailto:shoter998@gmail.com', publicVapidKey, privateVapidKey)

app.post('/subscribe', (req, res) => {
    const subscription = req.body 

    res.status(201).json({})

    const payload = JSON.stringify({
        title: 'Push Notification'
    })

    webpush.sendNotification(subscription, payload).catch(err => consoloe.error(err))
})

const port = 5001;
app.listen(port, () => console.log(`Server running on port ${port}`))