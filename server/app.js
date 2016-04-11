var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var user = require('./routes/user');
var index = require('./routes/index');

app.set("port", (process.env.PORT || 5000));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

// MONGO SETUP //

var mongoURI = "mongodb://localhost:27017/subdoc_tests_lecture";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function(err){
    console.log("Mongo Connection Error: ", err);
});

MongoDB.once('open', function(err){
    console.log("Mongo Connection Open")
});

// ROUTES //
app.use('/user', user);
app.use('/', index);

app.listen(app.get("port"), function(){
    console.log("Listening on port: " + app.get("port"));
});

module.exports = app;