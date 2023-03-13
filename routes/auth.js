const path = require('path');
const express = require('express');
const AuthController = require('../controllers/AuthController');
const router = express.Router();

var session;
router.get('/getDemo', function(req, res, next) {
    session = req.session;
    console.log("your mail is" + session.email);
    res.send(session.email);
});


router.get('/login', AuthController.getLogin);
router.get('/signup', AuthController.getSignUp);
router.post('/login', AuthController.postLogin);
router.post('/signup', AuthController.postSignUp);
router.get('/logout', AuthController.postLogout);