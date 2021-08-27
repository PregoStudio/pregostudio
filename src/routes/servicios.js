const express = require('express');
const passport = require('passport');
const router = express.Router();

const pool = require('../db');

router.get('/servicios', (req, res) => {
    res.render('layouts/servicios');
});

module.exports = router;