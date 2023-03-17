require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require('morgan');
const cors = require('cors');
var bodyParser = require('body-parser')


//imported from api/index.js
const apiRouter = require('./api')
app.use(express.json())
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/api', apiRouter);


module.exports = app;