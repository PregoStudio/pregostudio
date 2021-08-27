const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/control/signup', isLoggedIn, (req, res) => {
    res.render('auth/signup');
});

router.post('/control/signup', passport.authenticate('local.signup', {
    successRedirect: '/control/perfil',
    failureRedirect: '/control/signup',
    failureFlash: true
}));

router.get('/control/perfil', isLoggedIn, (req, res) => {
    res.render('perfil');
});

router.get('/control/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/control/');
});

router.get('/control/enfermeras', isLoggedIn, (req, res) => {
    res.render('control/nurse-signup');
});

module.exports = router;