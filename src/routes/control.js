const express = require('express');
const router = express.Router();

const pool = require('../db');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/control/', isNotLoggedIn, (req, res) => {
    res.render('control/');
});

router.post('/control/', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/control/perfil',
        failureRedirect: '/control/',
        failureFlash: true
    })(req, res, next);
});

router.get('/control/users', isLoggedIn, async (req, res) => {
    const usuarios = await pool.query('SELECT * FROM usuarios');
    console.log(usuarios);
    res.render('control/users', {usuarios});
});

module.exports = router;