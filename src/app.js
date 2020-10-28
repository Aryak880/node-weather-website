const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geoCode = require('./utils/geocode')

const app = express()
const port = process.env.PORT || 3000

// Defining paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


//Making route
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        place: 'Vindhyachal mirzapur',
        name: 'Aryak singh chauhan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Aryak singh chauhan'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This is message text',
        name: 'Aryak singh chauhan'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        message: '/page/* not found',
        name: 'Aryak singh chauhan'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    const {address} = req.query

    geoCode(address, (err, {longitude, latitude, placeName} = {}) => {
        if(err){
            res.send({
                error: err
            })
        }

        else{
            forecast(latitude, longitude, (err, data) => {
                if(err)
                    res.send({
                        error: err
                    })

                else{
                    const {feels_like, windSpeed, timeZone, 
                            humidity, description, clouds
                            } = data
                    
                    res.send({
                        feels_like,
                        windSpeed,
                        timeZone,
                        placeName,
                        humidity,
                        description,
                        clouds
                    })
                }
                    
            })
        }
    })    
})

app.get('/product', (req, res) => {
    
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    res.send({
        product: []
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        message: 'Kuch nhi milega',
        name: 'Aryak singh chauhan'
    })
})

app.listen(port, () => console.log("Server is running on port " + port))