﻿const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');

const root = './';
const port = process.env.PORT || 1337;
var cors = require('cors')
const app = express();

/*
 * connect to mongodb
 */
require('./mongo').connect();

app.use(cors());

app.use(bodyParser.json());

// default limit of 100kb is to low for word documents as xml string
app.use(bodyParser.urlencoded({ limit: '500kb', extended: false }))


app.use(express.static(path.join(root, 'dist')));
app.use('/api', routes);
app.get('*', (req, res) => {
    res.status(200).sendFile('./index.html', { root });
});

app.listen(port, () => console.log(`API running on localhost:${port}`));