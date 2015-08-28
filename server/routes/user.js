var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var Links = require('../models/links');

router.post('/create', function(req,res,next){
    var linksArray = [];
    var user = new User({username: req.body.username});
    for(var i = 0; i < req.body.links.length; i++) {
        var link = new Links({
            url: req.body.links[i].url,
            name: req.body.links[i].name
        });

        linksArray.push(link);
    }

    user.links = linksArray;

    user.save(function (err) {
        console.log(err.message);
    });

    res.json(user);
});

router.get('/users', function(req,res,next){
    return User.find({}).exec(function(err, users){
        if(err) throw new Error(err);
        res.json(users);
    });
});

module.exports = router;