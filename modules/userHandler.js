'use strict'

const axios = require('axios');
const userModel = require('../models/User');

const handler = {};

handler.getUser = function(req,res,next){
  userModel.find(req.query.user)
    .then(data => res.status(200).send(data))
    .catch(err => next(err));
}

handler.postUser = function(req,res,next){
  userModel.create(req.body)
    .then(createdUser => res.status(200).send(createdUser))
    .catch(err => next(err));
}

handler.putUser = function(req,res,next){
  const id = req.params.id;
  userModel.findByIdAndUpdate(id, req.body, {new:true})
    .then(updatedUser => res.status(200).send(updatedUser))
    .catch(err => next(err));
}

handler.deleteUser = function(req,res,next){
  const id = req.params.id;
  userModel.findByIdAndDelete(id)
    .then(() => res.status(200).send('User Data deleted'))
    .catch(err => next(err));
}

module.exports = handler;
