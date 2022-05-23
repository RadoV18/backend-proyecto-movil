// imports
const config = require('./utils/config');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

// import controllers

// mongoose
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => console.error(`error connecting to MongoDB: ${err.message}`));

// app
const app = express();
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// use controllers

module.exports = app;
