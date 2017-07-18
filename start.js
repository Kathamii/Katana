var express = require('express');
var app = express();
var bodyparser = require('body-parser');

var user = require('./routes/user.js');
var blog = require('./routes/blog.js');

var port = 3000;

app.use(bodyparser.json());

app.use('/api/V1', user);
app.use('/api/V1/blog', blog);

var server = app.listen(port);