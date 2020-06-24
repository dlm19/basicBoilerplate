const path = require('path');
const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');

// const router = require('express').Router();

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../public')));

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

const port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log(`Listening on port ${port}: http://localhost:${port}/`);
});

module.exports = app;
