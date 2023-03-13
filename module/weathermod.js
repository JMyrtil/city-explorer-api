'use strict';
const axios = require('axios');

// let cache = {

// };

class Forecast {
  constructor(reqForcast) {
    this.date = reqForcast.valid_date;
    this.description = reqForcast.weather.description;
  }
}

async function getWeather (request, response, next) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}&units=I&days=3`;
    let reqForcast = await axios(url);
    let reqWeather = reqForcast.data.data.map(temp => new Forecast(temp));
    response.send(reqWeather);
  } catch (error) {
    next(error);
  }
}

module.exports = getWeather;
