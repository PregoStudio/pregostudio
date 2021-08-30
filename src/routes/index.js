const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('./partials/home');
});

router.get('/nosotros', (req, res) => {
    res.render('./layouts/nosotros');
});

router.get('/asesoria-derecho-penal', (req, res) => {
    res.render('./servicios/asesoria-derecho-penal');
});

router.get('/delitos-administracion-publica', (req, res) => {
    res.render('./servicios/delitos-administracion-publica');
});

router.get('/recursos-apelacion-derecho-penal', (req, res) => {
    res.render('./servicios/recursos-apelacion-derecho-penal');
});

router.get('/representacion-judicial-extrajudicial', (req, res) => {
    res.render('./servicios/representacion-judicial-extrajudicial');
});

router.get('/estrategias-derecho-penal', (req, res) => {
    res.render('./servicios/estrategias-derecho-penal');
});

router.get('/representacion-voluntaria-ante-autoridades', (req, res) => {
    res.render('./servicios/representacion-voluntaria-ante-autoridades');
});

router.get('/redaccion-presentacion-denuncias', (req, res) => {
    res.render('./servicios/redaccion-presentacion-denuncias');
});

router.get('/recursos-extraordinarios-casacion', (req, res) => {
    res.render('./servicios/recursos-extraordinarios-casacion');
});

router.get('/representacion-ante-tribunales-cortes', (req, res) => {
    res.render('./servicios/representacion-ante-tribunales-cortes');
});

router.get('/videoblog/blog-detalle', (req, res) => {
    res.render('./partials/blog-detalle');
});

router.get('/videoblog', (req, res) => {
    res.render('./layouts/videoblog');
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

module.exports = router;