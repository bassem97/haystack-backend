const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');


var indexRouter = require('./routes/index');

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.use('/', indexRouter);
app.listen(8000);
