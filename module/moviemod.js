'use strict';
const axios = require('axios');

class Movies {
  constructor(movie) {
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.votes = movie.vote_average;
    this.totalvotes = movie.vote_count;
    this.imageurl = movie.poster_path;
    this.popularity = movie.popularity;
    this.release = movie.release_date;
  }
}

async function getMovie (request, response, next) {
  try {
    let city = request.query.search;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;
    // console.log(url);

    let movie = await axios(url);
    let movieData = movie.data.results.map(temp => new Movies(temp));
    response.send(movieData);
  } catch (error) {
    next(error);
  }
}

module.exports = getMovie;
