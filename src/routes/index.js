const express = require('express');
const passport = require('passport');
const router = express.Router();
const EmailCtrl = require('./nodemailer');
const pool = require('../db');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/', (req, res) => {
    res.render('layouts/home');
});

router.get('/nosotros', (req, res) => {
    res.render('layouts/nosotros');
});

router.get('/control', isNotLoggedIn, (req, res) => {
    res.render('control/');
});

router.post('/control/', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/control/perfil',
        failureRedirect: '/control/',
        failureFlash: true
    })(req, res, next);
});

router.get('/control/users', isLoggedIn, async(req, res) => {
    const usuarios = await pool.query('SELECT * FROM usuarios');
    res.render('control/users', {usuarios});
});

router.get('/control/historias', async (req, res) => {
    const pacientes = await pool.query('SELECT * FROM pacientes');
    res.render('control/historias', { pacientes });
});

router.get('/control/pacientes/eliminar/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM pacientes WHERE id = ?', [id]);
    req.flash('success', 'Usuario eliminado satisfactoriamente')
    res.redirect('/control/historias');
});

router.post('/usuarios/add', async (req, res) => {
    const {username, email, phone, description} = req.body;
    const newComUser = {
        username,
        email,
        phone,
        description
    };
    await pool.query('INSERT INTO usuarios SET ?', [newComUser]);
    req.flash('success', 'Mensaje enviado satisfactoriamente');
    res.redirect('/');
});

router.get('/control/users/delete/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    req.flash('success', 'Usuario eliminado satisfactoriamente')
    res.redirect('/control/users');
});

router.get('/control/historias/agregar', isLoggedIn, (req, res) => {
    res.render('control/historias/add');
});

router.post('/control/historias/agregar', isLoggedIn, async (req, res) => {
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
    res.redirect('/control/historias');
    console.log(req.body);
});

router.get('/control/historias/individual/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const pacientes = await pool.query('SELECT * FROM pacientes WHERE id = ?', [id]);
    res.render('control/individual', { pacientes: pacientes[0] });
});

router.post('/control/pacientes/estado/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    const newEstado = {
        estado
    };
    await pool.query('UPDATE pacientes set ? WHERE id=?', [newEstado, id]);
    req.flash('success', 'Estado actualizado correctamente');
    res.redirect('/control/historias');
});

router.post('/control/pacientes/evolucion/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const { evolucion } = req.body;
    const newEvo = {
        evolucion
    };
    await pool.query('UPDATE pacientes set ? WHERE id=?', [newEvo, id]);
    req.flash('success', 'Evolución agregada correctamente');
    res.redirect('/control/historias');
});

router.post('/control/pacientes/:id', isLoggedIn, async (req, res) => {
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
    res.redirect('/control/historias/');
});

router.get('/control/dia-saludable/agregar', isLoggedIn, async (req, res) => {
    await res.render('control/dia-saludable/add');
});

router.post('/control/dia-saludable/agregar', async (req, res) => {
    const {tema, urlimg, enlace, piefoto, miniatura, titulo, subtitulo, subtitleone, paraguno, subtitledos, paragdos, subtitletres, paragtres, subtitlecuatro, paragcuatro, subtitlecinco, paragcinco, subtitleseis, paragseis, autor, city} = req.body;
    const newComUser = {
        tema,
        urlimg,
        enlace,
        piefoto,
        miniatura,
        titulo,
        subtitulo,
        subtitleone,
        paraguno,
        subtitledos,
        paragdos,
        subtitletres,
        paragtres,
        subtitlecuatro,
        paragcuatro,
        subtitlecinco,
        paragcinco,
        subtitleseis,
        paragseis,
        autor,
        city
    };
    await pool.query('INSERT INTO blog SET ?', [newComUser]);
    req.flash('success', 'Artículo enviado satisfactoriamente');
    res.redirect('/control/dia-saludable');
});

router.get('/control/dia-saludable/', isLoggedIn, async (req, res) => {
    const blog = await pool.query('SELECT * FROM blog');
    res.render('control/dia-saludable/dia-saludable', { blog });
});

router.post('/control/dia-saludable/editar/:id', async (req, res) => {
    const { id } = req.params;
    const {tema, urlimg, enlace, piefoto, miniatura, titulo, subtitulo, subtitleone, paraguno, subtitledos, paragdos, subtitletres, paragtres, subtitlecuatro, paragcuatro, subtitlecinco, paragcinco, subtitleseis, paragseis, autor, city} = req.body;
    const newBlog = {
        tema,
        urlimg,
        enlace,
        piefoto,
        miniatura,
        titulo,
        subtitulo,
        subtitleone,
        paraguno,
        subtitledos,
        paragdos,
        subtitletres,
        paragtres,
        subtitlecuatro,
        paragcuatro,
        subtitlecinco,
        paragcinco,
        subtitleseis,
        paragseis,
        autor,
        city
    };
    await pool.query('UPDATE blog set ? WHERE id=?', [newBlog, id]);
    req.flash('success', 'Artículo actualizado correctamente');
    res.redirect('/control/dia-saludable');
});

router.get('/control/dia-saludable/eliminar/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM blog WHERE id = ?', [id]);
    req.flash('success', 'Artículo eliminado satisfactoriamente')
    res.redirect('/control/dia-saludable/');
});

router.get('/control/dia-saludable/editar/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const blog = await pool.query('SELECT * FROM blog WHERE id = ?', [id]);
    res.render('control/dia-saludable/editar', { blog: blog[0] });
});

router.get('/control/historias/imprimir/:id', isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const pacientes = await pool.query('SELECT * FROM pacientes WHERE id = ?', [id]);
    res.render('enfermeras/historia', { pacientes: pacientes[0] });
});

// Blog

router.get('/dia-saludable', async (req, res) => {
    const blog = await pool.query('SELECT * FROM blog');
    res.render('dia-saludable/', { blog });
});

router.get('/dia-saludable/:id', async (req, res) => {
    const { id } = req.params;
    const blog = await pool.query('SELECT * FROM blog WHERE id = ?', [id]);
    res.render('dia-saludable/articulo', { blog: blog[0] });
});

router.get('/dia-saludable/habitos-2021-postcovid', async (req, res) => {
    const blog = await pool.query('SELECT * FROM blog');
    res.render('dia-saludable/habitos-2021-postcovid', { blog });
});

// Políticas

router.get('/politica-privacidad', (req, res) => {
    res.render('partials/politica-privacidad');
});

router.get('/politica-cookies', (req, res) => {
    res.render('partials/politica-cookies');
});

module.exports = router;