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
    } else {
      data = data.sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
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
  res.status(200).send(data);
});
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
