'use strict'

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const watchmodeHandler = require('./watchmodeHandler');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

mongoose.connect(process.env.MONGODB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  console.log('Mongoose is connected');
})

app.get('/', (req,res) => response.send('default route working'))

app.get('/getTitles', watchmodeHandler.getRelativeTitles)

app.use((err, req, res, next)=> res.status(500).send('Something failed on the Server'));

app.listen(PORT, () => console.log(`listening on ${PORT}`));