const express = require('express');
const router = express.Router();
const pool = require('../db');

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.post('/clients/add', async (req, res) => {
    const { nombre, telefono, email, descripcion, producto } = req.body;
    const newClient = {
        nombre,
        telefono,
        email,
        descripcion,
        producto
    };
    await pool.query('INSERT INTO clients SET ?', [newClient]) // Guardar a base de dates
    req.flash('success', 'Solicitud enviada correctamente. En breve nos pondremos en contacto.');
    res.redirect('/');
});

// router.get('/signup', isNotLoggedIn, async (req, res) => {
//     res.render('auth/signup')
// });

// router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
//     successRedirect: '/profile',
//     failureRedirect: '/signup',
//     failureFlash: true
// }));

// router.get('/signin', isNotLoggedIn, (req, res) => {
//     res.render('auth/signin')
// });

// router.post('/signin', isNotLoggedIn, (req, res, next) => {

//     passport.authenticate('local.signin', {
//         successRedirect: '/profile',
//         failureRedirect: '/signin',
//         failureFlash: true
//     })(req, res, next);
// });

// router.get('/profile', isLoggedIn, (req, res) => {
//     res.render('profile')
// });

// router.get('/logout', isLoggedIn, (req, res) => {
//     req.logout();
//     res.redirect('/signin')
// });

module.exports = router;