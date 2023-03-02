'use strict'

const axios = require('axios');
const staticData = require('./staticdata.json')
const cache = require('./cache');

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
    this.name = data.name;
    this.type = data.type;
    this.year = data.year;
    this.image_url = data.image_url;
    this.movieId = data.id;
  }
}

handler.getTitleInformation = function(req,res,next){
  const title = req.query.title;
  const key = 'watchmode-' + title;
  if (cache[key] && (Date.now() - cache[key].timestamp) < 86400000) {
    console.log('Cache Hit - Sending data from Cache');
    res.status(200).send(cache[key].data);
  } else {
    console.log('Cache Miss - Making new Request');
    const url = `https://api.watchmode.com/v1/title/345534/details/?apiKey=YOUR_API_KEY`;
    axios.get(url)
      .then()
      .catch(err => next(err));
  }
}



module.exports = handler;