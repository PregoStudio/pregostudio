const express = require('express');
const passport = require('passport');
const router = express.Router();
const pool = require('../db');

router.get('/', (req, res) => {
    res.render('./partials/home');
});

router.get('/nosotros', (req, res) => {
    res.render('./layouts/nosotros');
});

router.get('/contacto', (req, res) => {
    res.render('./layouts/contacto');
});

router.get('/cookies', (req, res) => {
    res.render('./layouts/cookies');
});

router.get('/privacy', (req, res) => {
    res.render('./layouts/privacy');
});

router.get('/sitemap', (req, res) => {
    res.render('layouts/sitemap');
});

router.get('/control', (req, res) => {
    res.render('control/');
});

router.get('/control/perfil', (req, res) => {
    res.render('control/perfil');
});

// router.post('/control/', isNotLoggedIn, (req, res, next) => {
//     passport.authenticate('local.signin', {
//         successRedirect: '/control/perfil',
//         failureRedirect: '/control/',
//         failureFlash: true
//     })(req, res, next);
// });

module.exports = router;