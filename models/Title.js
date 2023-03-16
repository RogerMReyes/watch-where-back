'use strict'

const mongoose = require('mongoose');

const {Schema} = mongoose;

const TitleSchema = new Schema({
  email: String,
  movieId: Number,
  title: String,
  description: String,
  releaseDate: String,
  userRating: Number,
  poster: String,
  sources: [Schema.Types.Mixed],
  notes: String
});

module.exports = mongoose.model('Title', TitleSchema);