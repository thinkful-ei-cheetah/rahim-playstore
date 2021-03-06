'use strict';
const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore');
const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => res.send('hello, world'));

app.get('/apps', (req, res) => {
  const genresList = [
    'Action',
    'Puzzle',
    'Strategy',
    'Casual',
    'Arcade',
    'Card'
  ];
  let data = playstore;
  const { sort, genres } = req.query;

  if (sort) {
    if (!['rating', 'app'].includes(sort)) {
      return res.status(400).send(`Sort must be rating or app`);
    }
  }

  if (genres) {
    if (genresList.includes(genres)) {
      data = data.filter(element => {
        return element.Genres.toLowerCase() === genres.toLowerCase();
      });
    } else {
      res.status(404).send('You must supply a valid genre');
    }
  }

  if (sort === 'app') {
    data.sort((a, b) => {
      return a['App'].toLowerCase() > b['App'].toLowerCase()
        ? 1
        : a['App'].toLowerCase() < b['App'].toLowerCase()
        ? -1
        : 0;
    });
  } else if (sort === 'rating') {
    data.sort((a, b) => {
      return a['Rating'] - b['Rating'];
    });
  }
  data.forEach(element => {
    // console.log(element.Rating);
    console.log(element.App);
  });
  res.status(200).send(data);
});
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
