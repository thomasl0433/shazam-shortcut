"use strict";

const express = require("express");
const morgan = require("morgan");
const spotify = require('./spotify.js')
const fs = require('fs')
var cors = require('cors')
require("dotenv").config();

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";
let token = "";

// App
const app = express();
app.use(cors())
app.use(morgan("tiny"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/receive-token', (req, res) => {
  token = req.query.data

  // fs.writeFile('token.txt', token, (err) => {
  //   if (err) throw err;
  // }) 

  res.send('Registering token')
})

app.get('/search', (req, res) => {
  try {
    const artist = req.query.artist;
    const title = req.query.title;

    spotify.search(artist, title, token)

    res.json({
      "artist": artist, 
      "title": title
    });
  } catch (e) {
     console.log(e)
  }
  
})

// start web server
app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);



// TO DO
// 1) take query params in the GET route
// 2) ping the URL https://shazam-shortcut-pqymwrjaca-uc.a.run.app
