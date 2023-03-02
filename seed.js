'use strict'

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URL);

const Title = require('./models/Title');

async function seed() {

  const titleOne = new Title({
    email: "example.gmail.com",
    movieId: 3173903,
    title: "Breaking Bad",
    description: "When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
    releaseDate: "2008-01-20",
    userRating: 9.2,
    poster: "https://cdn.watchmode.com/posters/03173903_poster_w185.jpg",
    sources: [
      {
        "source_id": 203,
        "name": "Netflix",
        "type": "sub",
        "region": "US",
        "ios_url": "nflx://www.netflix.com/title/70143836",
        "android_url": "nflx://www.netflix.com/Browse?q=action%3Dplay%26source%3Dmerchweb%26target_url%3Dhttp%3A%2F%2Fmovi.es%2FVoft6",
        "web_url": "http://www.netflix.com/title/70143836",
        "format": "4K",
        "price": null,
        "seasons": 5,
        "episodes": 62
      },
      {
        "source_id": 349,
        "name": "iTunes",
        "type": "buy",
        "region": "US",
        "ios_url": "com.apple.TVShows://product/Pilot,%20Season%201/271382034/tvSeason",
        "android_url": null,
        "web_url": "https://itunes.apple.com/us/tv-season/pilot/id271383858?i=271866344&amp;uo=4&amp;at=1000l3V2",
        "format": "HD",
        "price": 1.99,
        "seasons": 5,
        "episodes": 62
      },
      {
        "source_id": 307,
        "name": "VUDU",
        "type": "buy",
        "region": "US",
        "ios_url": "vuduapp://play?contentId=207577",
        "android_url": "vuduapp://207577",
        "web_url": "https://www.vudu.com/content/movies/details/Breaking-Bad-Pilot/207577",
        "format": "HD",
        "price": 1.99,
        "seasons": 5,
        "episodes": 62
      }
    ]
  });

  await titleOne.save()
    .then(res => console.log('Saved Title'))
    .catch(err => console.error(err));

  mongoose.disconnect();
}

seed();