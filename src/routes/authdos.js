const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/authdos');

router.get('/control/enfermeras', isLoggedIn, (req, res) => {
    res.render('/control/nurse-signup');
});

// router.post('/control/nurse-signup', (req, res) => {
//     console.log(req.body);
// });

router.post('/control/nurse-signup', passport.authenticate('local.nursesignup', {
    successRedirect: '/control/perfil',
    failureRedirect: '/control/nurse-signup',
    failureFlash: true
}));

router.get('/control/perfil', (req, res) => {
    res.render('perfil');
});

router.get('/personal/logout', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/personal/');
});

router.post('/personal/', (req, res, next) => {
    passport.authenticate('local.nursesignin', {
        successRedirect: '/personal/perfil',
        failureRedirect: '/personal/',
        failureFlash: true
    })(req, res, next);
});

module.exports = router;