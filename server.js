'use strict';

const express = require('express');

const superagent = require('superagent');

const cors = require('cors');

 require('dotenv').config();

const app = express();

const PORT = process.env.PORT;

app.use(cors());


app.get('/location', (request, response) => {
    const locationData = searchToLatLong(request.query.data);
    response.send(locationData);
});

app.get('/weather', (request, response) => {
    const weatherData = searchWeather(request.query.data);
    response.send(weatherData);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));


function searchToLatLong(query) {
    const geoData = require('./data/geo.json');
    const location = new Location(geoData);
    location.search_query = query;
    return location;
};

function Location(data){
    this.formatted_query = data.results[0].formatted_address;
    this.latitude = data.results[0].geometry.location.lat;
    this.longitude = data.results[0].geometry.location.lng;
}

function searchWeather(query){
    const newWeatherData = require('./data/darksky.json');
    const weather = new Weather(newWeatherData);
    weather.search_query = query;
    return weather;
};

function Weather(data) {
    this.daily = data.daily.data;
    this.time = function() {
    let date = data.daily.data[0].time;
    let newDate = date.setUTCSeconds(utcSeconds);

    return newDate;
    };

}

