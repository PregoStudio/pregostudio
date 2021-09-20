const express = require('express');
const router = express.Router();

const pool = require('../db');

router.get('/control/', (req, res) => {
    res.render('control/');
});

router.get('/control/solicitudes', async (req, res) => {
    const modelos = await pool.query('SELECT * FROM pclients');
    console.log(modelos);
    res.render('control/solicitudes', {modelos});
});

// router.post('/control/', isNotLoggedIn, (req, res, next) => {
//     passport.authenticate('local.signin', {
//         successRedirect: '/control/perfil',
//         failureRedirect: '/control/',
//         failureFlash: true
//     })(req, res, next);
// });

module.exports = router;