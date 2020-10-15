const express = require('express');
const logger = require('morgan');
const app = express();

const userRoutes = require('./routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Ovako se dodaje prefix za sve učitane rute kao u Springu npr @RequestMapping('users')
app.use('/users', userRoutes);

module.exports = app;
