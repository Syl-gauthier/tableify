'use strict';

var express = require('express');
var app = express();
//var bodyParser = require('body-parser');

var port = process.env.PORT || 2000; //TODO set NODE_ENV environement variable

/*
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); // needed for express.js
*/

app.use(express.static('public'));

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});
