const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const nodemailer = require('nodemailer');

const pool = require('../db');
// const { isLoggedIn } = require('../lib/auth')

router.post('/clients/add', async (req, res) => {
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

router.post('/clients/add', async (req, res) => {
    const { nombre, telefono, email, descripcion, producto } = req.body;
    contentHTML = `
        <h1>Información del nuevo usuario</h1>
        <ul>
            <li>
                Nombre: ${nombre}
            </li>
            <li>
                Correo electrónico: ${email}
            </li>
            <li>
                Teléfono: ${telefono}
            </li>
            <li>
                Descripción: ${descripcion}
            </li>
            <li>
                Producto: ${producto}
            </li>
        </ul>
    `;

    const transporter = nodemailer.createTransport({
        host: 'mail.decortinaseinteriores.com',
        port: '993',
        secure: false,
        auth: {
            user: 'solicitudes@decortinaseinteriores.com',
            pass: '_q=@=KfgBZI6'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = transporter.sendMail({
        from: "'Solicitudes Decortinas' <solicitudes@decortinaseinteriores.com>",
        to: 'decortinaseinteriores@gmail.com',
        subject: 'Recibiste un nuevo cliente',
        text: 'Hello World'
    });

    console.log('Mensaje enviado', info.messageId);

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

module.exports = router;