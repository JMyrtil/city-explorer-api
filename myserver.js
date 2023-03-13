'use strict';

console.log('Yuh');

//Require
// here we will list the requirement for our server

// to creatte a server we are bringing in Express
const express = require('express');
// const axios = require('axios');
const getMovie = require('./module/moviemod');
const getWeather = require('./module/weathermod');


// we need to bring in our .env file, so we'll use this after we have run 'npm i dotenv'
require('dotenv').config();

// let data = require('./data/weather.json');

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


// example request: http://localhost:3001/weather?lat=xxxxx&lon=xxxx&key=xxx
// app.get('/city', async (request, response, next) => {
//   try {
//     // response.send('Weather incoming');
//     let lat = request.query.lat;
//     let lon = request.query.lon;
//     let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}&units=I&days=3`;
//     // console.log(url);


//     let reqForcast = await axios(url);
//     // let cityRequested = request.query.city_name;

//     // console.log(cityRequested);
//     // find the pet in the pet array (from pets.json) whose species equals what the is requested

//     // let cityObject = data.find(city => city.city_name.toLowerCase() === cityRequested.toLowerCase());

//     // console.log(cityObject);
//     // let selectedCity = new City(cityObject);

//     let reqWeather = reqForcast.data.data.map(temp => new Forecast(temp));
//     // let selectedForecast = cityObject.data.map(temp => new Forecast(temp));

//     // console.log(selectedForecast);
//     // response.send(selectedCity);
//     // response.send(selectedForecast);
//     response.send(reqWeather);
//   } catch (error) {
//     next(error);
//   }
// });


// app.get('/movies', async (request, response, next) => {
//   try {
//     let city = request.query.search;

//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;
//     console.log(url.data);

//     let movie = await axios(url);
//     let movieData = movie.data.results.map(temp => new Movies(temp));
//     response.send(movieData);
//   } catch (error) {
//     next(error);
//   }
// });
app.get('/city', getWeather);

app.get('/movies', getMovie);


// async function getMovie (request, response, next) {
//   try {
//     let city = request.query.search;

//     let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;
//     console.log(url.data);

//     let movie = await axios(url);
//     let movieData = movie.data.results.map(temp => new Movies(temp));
//     response.send(movieData);
//   } catch (error) {
//     next(error);
//   }
// }


// must be listed last in our route list
app.get('*', (req, res) => {
  res.send('The resource does not exist');
});

// CLASSES
// class City {
//   constructor(cityObject) {
//     this.name = cityObject.city_name;
// this.lon = cityObject.lon;
//     this.lat = cityObject.lat;
//   }
// }

// class Forecast {
//   constructor(reqForcast) {
//     this.date = reqForcast.valid_date;
//     this.description = reqForcast.weather.description;
//   }
// }

// class Movies {
//   constructor(movie) {
//     this.title = movie.original_title;
//     this.overview = movie.overview;
//     this.votes = movie.vote_average;
//     this.totalvotes = movie.vote_count;
//     this.imageurl = movie.poster_path;
//     this.popularity = movie.popularity;
//     this.release = movie.release_date;
//   }
// }

// ERRORS
// handle all the errors
// app.use((error, request, response, next) => {
//   response.status(500).send(error.message);
// });


// LISTEN
// start the server
// listen is Express methtod that takes in two arguments, a port value and a call back function
app.listen(PORT, () => console.log(`listening on ${PORT}`));
