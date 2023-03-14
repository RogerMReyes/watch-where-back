'use strict'

const axios = require('axios');
const staticData = require('./staticdata.json');
const cache = require('./cache');
const titleModel = require('../models/Title');

const handler = {};

handler.getRelativeTitles = function (req, res, next) {
  const search = req.query.searchQuery;
  const key = 'watchmode-' + search;
  if (cache[key] && (Date.now() - cache[key].timestamp) < 86400000) {
    console.log('Cache Hit - Sending data from Cache');
    res.status(200).send(cache[key].data);
  } else {
    console.log('Cache Miss - Making new Request');
    const url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${process.env.WATCHMODE_API_KEY}&search_value=${search}&search_type=1`;
    axios.get(url)
      .then(response => response.data.results.map(title => new RelativeTitles(title)))
      .then(formattedData => {
        cache[key] = {};
        cache[key].data = formattedData;
        cache[key].timestamp = Date.now();
        res.status(200).send(formattedData)
      })
      .catch(err => next(err));
  }
}
class RelativeTitles{
  constructor(data){
    this.title = data.name;
    this.type = data.type;
    this.year = data.year;
    this.image_url = data.image_url;
    this.movieId = data.id;
  }
}

handler.getTitleInformation = function(req,res,next){
  const titleID = req.query.titleID;
  const key = 'watchmode-' + titleID;
  if (cache[key] && (Date.now() - cache[key].timestamp) < 86400000) {
    console.log('Cache Hit - Sending data from Cache');
    res.status(200).send(cache[key].data);
  } else {
    console.log('Cache Miss - Making new Request');
    const url = `https://api.watchmode.com/v1/title/${titleID}/details/?apiKey=${process.env.WATCHMODE_API_KEY}&append_to_response=sources`;
    axios.get(url)
      .then(response => new Title(response.data))
      .then(formattedData => {
        cache[key] = {};
        cache[key].data = formattedData;
        cache[key].timestamp = Date.now();
        res.status(200).send(formattedData)
      })
      .catch(err => next(err));
  }
}

class Title{
  constructor(data){
    this.movieId = data.id;
    this.title = data.title;
    this.description = data.plot_overview;
    this.releaseDate = data.year;
    this.userRating = data.user_rating;
    this.poster = data.poster;
    this.sources = data.sources;
  }
}

handler.getProfileTitles = function(req,res,next){
  titleModel.find({email: req.user.email})
    .then(titles => res.status(200).send(titles))
    .catch(err => next(err));
}

handler.postTitle = function (req, res, next){
  titleModel.create({...req.body, email: req.user.email})
    .then(savedTitle => res.status(200).send(savedTitle))
    .catch(err => next(err));
}

handler.deleteTitle = function (req, res, next){
  let id = req.params.id;
  titleModel.findByIdAndDelete(id)
    .then(() => res.status(200).send('Title deleted'))
    .catch(err => next(err));
}

module.exports = handler;