'use strict';

console.log('Yuh');

const express = require('express');
const weather = require('./modulec10/c10weather');
const getMovie = require('./module/moviemod');

require('dotenv').config();

const cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

app.get('/city', weatherHandler);
app.get('/movies', getMovie);
app.get('/', (req, res) => {
  res.status(200).send('homepagehit');
});



function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
    .then(summaries => response.send(summaries))
    .catch((error) => {
      console.error(error);
      response.status(200).send('Sorry. Something went wrong!');
    });
}

app.listen(PORT, () => console.log(`Server up on ${process.env.PORT}`));
