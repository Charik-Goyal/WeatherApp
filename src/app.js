const express = require('express')
const path = require('path')
const hbs = require('hbs')
const process = require('process')
const app = express()
const request = require ('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

//define paths for express config
const publicPathDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebar location and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicPathDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather',
        name : 'Charik goyal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About me',
        name : 'Charik Goyal'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help Page',
        name : 'Charik Goyal'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error: 'add the address'
        })
    }

    // console.log(req.query.address)
    // res.send({
    //     city_name: req.query.address
    // })
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        return res.send({error})
        
        forecast(latitude,longitude,(error,forecastData)=>{
        if(error)
        return res.send({error})

        return res.send({
             location,
            forecast : forecastData,
            address : req.query.address
        })
        })
    })
    
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Charik Goyal',
        errorMessage: 'Help page Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Charik Goyal',
        errorMessage : 'Page is not available'
    })
})

app.listen(port,()=>{
    console.log('app is running on port' + port)
})