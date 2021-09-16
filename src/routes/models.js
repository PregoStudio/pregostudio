const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const nodemailer = require('nodemailer');

const pool = require('../db');
// const { isLoggedIn } = require('../lib/auth')

router.post('/clients/add', async (req, res) => {
    const { nombre, telefono, email, descripcion } = req.body;
    const newModel = {
        nombre,
        telefono,
        email,
        descripcion
    };
    await pool.query('INSERT INTO clients SET ?', [newModel]) // Guardar a base de dates
    req.flash('success', 'Solicitud enviada correctamente. En breve nos pondremos en contacto.');
    res.redirect('/');
});

module.exports = router;