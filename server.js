'use strict';

console.log('Yuh');

//Require
// here we will list the requirement for our server

// to creatte a server we are bringing in Express
const express = require('express');


// we need to bring in our .env file, so we'll use this after we have run 'npm i dotenv'
require('dotenv').config();

let data = require('./data/weather.json');


// we must include cors if we want to share resources over the web
const cors = require('cors');

// USE
// once we require something, we have to use it
// this is where we assign  the required file a variable
// react does this in one step with import, it says we must use it and it assigns it to a variable
// express takes 2 steps: require and use
const app = express();
app.use(cors());

// define a PORT & validate env is working
const PORT = process.env.PORT || 3002;

// if my server is running on 3002, I know something is wrong with either my .env file or how I'm importing it.

// ROUTES
// we will use these to access our endpoints

// define our default route
// app.get() correlates to axios.get()
// the first arugment is a URL in quote
// the second is the callback that defines what should happen when aa request comes into that url
// app.get('/', (request, response) => {
//   response.send('Hello from our server!');
// });

// app.get('/sayHello', (request, response) => {
//   console.log(request.query.firstName);
//   let firstName = request.query.firstName;
//   response.send(`hello ${firstName}`);
// });


// example request: http://localhost:3001/weather?data=lat
app.get('/city', (request, response, next) => {
  try {
    // response.send('Weather incoming');
    let cityRequested = request.query.city_name;
    console.log(cityRequested);
    // find the pet in the pet array (from pets.json) whose species equals what the is requested
    let cityObject = data.find(city => city.city_name.toLowerCase() === cityRequested.toLowerCase());
    // console.log(cityObject);
    // let selectedCity = new City(cityObject);
    let selectedForecast = cityObject.data.map(temp => new Forecast(temp));
    // console.log(selectedForecast);
    // response.send(selectedCity);
    response.send(selectedForecast);
  } catch (error) {
    next(error);
  }
});

// must be listed last in our route list
app.get('*', (req, res) => {
  res.send('The resource does not exist');
});

// CLASSES
// class City {
//   constructor(cityObject) {
//     this.name = cityObject.city_name;
//     this.lon = cityObject.lon;
//     this.lat = cityObject.lat;
//   }
// }

class Forecast {
  constructor(cityObject) {
    this.date = cityObject.valid_date;
    this.description = cityObject.weather.description;
  }
}

// ERRORS
// handle all the errors
// app.use((error, request, response, next) => {
//   response.status(500).send(error.message);
// });


// LISTEN
// start the server
// listen is Express methtod that takes in two arguments, a port value and a call back function
app.listen(PORT, () => console.log(`listening on ${PORT}`));
