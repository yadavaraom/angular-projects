﻿var express = require('express');
var router = express.Router();
var request = require('request');
var config = require('config.json');



router.get('/', function (req, res) {
    // log user out
    delete req.session.token;
    console.log("router get");
    // move success message into local variable so it only appears once (single read)
    var viewData = { success: req.session.success };
    delete req.session.success;

    res.render('login', viewData);
});



router.post('/', function (req, res) {
    request.post({
        url: config.apiUrl + '/users/authenticate',
        form: req.body,
        json: true
    }, function (error, response, body) {
        if (error) {
            console.log("error==>",error);
            return res.render('login', { error: 'An error occurred' });
        }

        if (!body.token) {
            return res.render('login', { error: body, username: req.body.username });
        }

        //console.log("body.token==>",body);
        // save JWT token in the session to make it available to the angular app
        req.session.token = body.token;

        // redirect to returnUrl
        var returnUrl = req.query.returnUrl && decodeURIComponent(req.query.returnUrl) || '/';
		    console.log("returnUrl==>",returnUrl);

        res.redirect(returnUrl);
    });
});

module.exports = router;