const express = require('express');
const passport = require('passport');
const router = express.Router();
// const EmailCtrl = require('./nodemailer');
const pool = require('../db');
const { isLoggedIn, isNotLoggedIn } = require('../lib/authdos');

const PdfPrinter = require('pdfmake');
const fs = require('fs');

// EmailCtrl.sendNurseEmail,

router.get('/personal', (req, res) => {
    res.render('enfermeras/');
});

router.get('/personal/perfil', (req, res) => {
    res.render('enfermeras/perfil-nurse');
});

router.get('/personal/users', async (req, res) => {
    const usuarios = await pool.query('SELECT * FROM usuarios');
    res.render('enfermeras/servicios', {usuarios});
});

router.get('/personal/historias/agregar', isLoggedIn, (req, res) => {
    res.render('enfermeras/agregar');
});

router.post('/personal/historias/agregar', isLoggedIn, async (req, res) => {
    const { pacientenombre, pacienteedad, pacienteeps, pacientediagnostico, pacienteservicio, pacientetel, pacienteingreso, pacientesalida, pacienteresponsable, pacienteparentezco, estado } = req.body;
    const newPaciente = {
        pacientenombre,
        pacienteedad,
        pacienteeps,
        pacientediagnostico,
        pacienteservicio,
        pacientetel,
        pacienteingreso,
        pacientesalida,
        pacienteresponsable,
        pacienteparentezco,
        estado
    };
    await pool.query('INSERT INTO pacientes SET ?', [newPaciente]);
    req.flash('success', 'Paciente registrado correctamente');
    res.redirect('/personal/historias');
    console.log(req.body);
});

router.get('/personal/historias', isLoggedIn, async (req, res) => {
    const pacientes = await pool.query('SELECT * FROM pacientes');
    res.render('enfermeras/historias', { pacientes });
});

router.get('/personal/historias/individual/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const pacientes = await pool.query('SELECT * FROM pacientes WHERE id = ?', [id]);
    res.render('enfermeras/individual', { pacientes: pacientes[0] });
});

router.post('/personal/pacientes/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { pacientepeso, pacientedieta, pacienteoxigeno, tratamiento, plan, evolucion } = req.body;
    const newKardex = {
        pacientepeso,
        pacientedieta,
        pacienteoxigeno,
        tratamiento,
        plan,
        evolucion
    };
    await pool.query('UPDATE pacientes set ? WHERE id=?', [newKardex, id]);
    req.flash('success', 'Kárdex actualizado correctamente');
    res.redirect('/personal/historias/');
});

router.post('/personal/pacientes/evolucion/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { evolucion } = req.body;
    const newEvo = {
        evolucion
    };
    await pool.query('UPDATE pacientes set ? WHERE id=?', [newEvo, id]);
    req.flash('success', 'Evolución agregada correctamente');
    res.redirect('/personal/historias/');
});

router.post('/personal/pacientes/estado/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    const newEstado = {
        estado
    };
    await pool.query('UPDATE pacientes set ? WHERE id=?', [newEstado, id]);
    req.flash('success', 'Estado actualizado correctamente');
    res.redirect('/personal/historias/');
});

module.exports = router;