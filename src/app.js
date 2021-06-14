const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();
const port = process.env.PORT || 3000

//define paths for express config
const dirPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials');

// setup handelbars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//setup static directory to serve
app.use(express.static(dirPath));

app.get('', (req,res)=>{
    res.render('index', {
        title:'Weather',
        name: 'Lakshay',
        tilt: 'Bunty Singh link'
    })
})

app.get('/about', (req,res)=>{
    res.render('about', {
        title:'About Page',
        name: 'Lakshay',
        tilt: 'Bunty Singh link'
    })
})

app.get('/help', (req,res)=>{
    res.render('help', {
        title:'Help Page',
        name: 'Lakshay',
        tilt: 'Bunty Singh link'
    })
})

app.get('/weather', (req,res)=> {
    if(!req.query.address){
        return res.send({
            error: 'must enter address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error) return res.send({error});
    
        forecast(longitude,latitude,(error, {temperature, Feels_like: feels_like}={}) => {
            if(error) {return res.send({error})};
            res.send({
                location,
                temperature,
                Feels_like: feels_like
            })
          })
    })

    
})

app.get('/help/*', (req,res)=>{
    res.render('error',{
        error: 'Help page does not exist',
        name: 'Lakshay'
    })
})


app.get('*', (req,res)=>{
    res.render('error',{
        error: '404 Page Not Found',
        name: 'Lakshay'
    })
})

app.listen(port,()=>{
    console.log('Server is up and running.');
})