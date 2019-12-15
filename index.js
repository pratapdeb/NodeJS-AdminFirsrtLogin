const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes/auth');
const app = express();
require('dotenv').config();
const DBurl = process.env.MONGODB_URL;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());
// //connecting to  MONGODB database 
mongoose.connect(DBurl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to mongoDB')
        app.listen(process.env.PORT || 4000, () => console.log(`Listening on port 4000`));
    })
    .catch(err => console.error('Somethigng went wrong'))

app.use('/', router);
