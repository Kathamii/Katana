var express = require('express');
var app = express();
var bodyparser = require('body-parser');

var user = require('./routes/user.js');
var blog = require('./routes/blog.js');
var authentification = require('./controller/authentificationcontroller.js');


var port = 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/api/V1', authentification);
app.use('/api/V1', user);
app.use('/api/V1/blog', blog);

var server = app.listen(port);