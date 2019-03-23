const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocoding')
const forecast = require('./utils/forecast')

// initialize express app
const app = express()

const port = process.env.PORT || 3000

//define path of dir
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars for view engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static dir to serve
app.use(express.static(publicDirectoryPath))

//router
app.get('', (req, res) => {
    res.render('index', {
        title: 'Homepage',
        name: 'Obong'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help me',
        name: 'Obong',
        helpText: 'helep mee'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about me',
        name: 'Obong'

    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, {
        latitude,
        longitude,
        location
    } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast: forcastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

//main listen
app.listen(port, () => {
    console.log('server up on PORT' + port)
})