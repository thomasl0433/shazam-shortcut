"use strict";

const express = require("express");
const morgan = require("morgan");

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

// App
const app = express();
app.use(morgan('tiny'));
app.get("/search", (req, res) => {
  const artist = req.query.artist;
  const title = req.query.title;

  const out = {
    artist: artist,
    title: title,
  };
  res.json(out);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// TO DO
// 1) take query params in the GET route
// 2) ping the URL https://shazam-shortcut-pqymwrjaca-uc.a.run.app
