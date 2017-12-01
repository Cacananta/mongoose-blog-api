const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');

mongoose.connect('mongodb://localhost/my-blog', {useMongoClient: true});
mongoose.promise = Promise;

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', function(req, res) {
  res.status(200).send();
});

app.use('/api/users', require('./routes/users'));
app.use('/api/blogs', require('./routes/blogs'));

module.exports = app;

