'use strict';
const express = require('express');
const morgan = require('morgan');
const playstore = require('./playstore');
const app = express();

app.use(morgan('common'));

app.get('/', (req, res) => res.send('hello, world'));

app.get('/apps', (req, res) => {
  const genres = ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'];

  res.send(playstore);
});
app.listen(8080, () => {
  console.log('Server is running on port 8080');
});
