const passport = require('passport');
const Strategy = require('passport-local').Strategy;

const pool = require('../db');
const helpers = require('./helpersdos');

passport.use('local.nursesignin', new Strategy({
    usernameField: 'enfermera',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, nombre, pass, done) => {
    console.log(req.body);
    const rows = await pool.query('SELECT * FROM enfermeras WHERE enfermera = ?', [nombre]);
    if (rows.length > 0) {
        const nurse = rows[0];
        const validPassword = await helpers.matchPassword(pass, nurse.pass);
        if (validPassword) {
            done(null, nurse, req.flash('success', 'Bienvenid@' + nurse.nombre));
        } else {
            done(null, false, req.flash('message', 'La contraseña es incorrecta'));
        }
    } else {
        return done(null, false, req.flash('message', 'El nombre de usuario no existe'));
    }
}));

passport.use('local.nursesignup', new Strategy({
    usernameField: 'enfermera',
    passwordField : 'pass',
    passReqToCallback: true
 }, async (req, enfermera, pass, done) => {
     const { nombre } = req.body;
     const newEnfermera = {
         nombre,
         enfermera,
         pass
     };
     newEnfermera.pass = await helpers.encryptPassword(pass);
     const result = await pool.query('INSERT INTO enfermeras SET ?', [newEnfermera]);
     newEnfermera.id = result.insertId;
     return done(null, newEnfermera);
 }));

passport.serializeUser((nurse, done) => {
    done(null, nurse.id);
});

passport.deserializeUser( async(id, done) => {
    const rows = await pool.query('SELECT * FROM enfermeras WHERE id = ?', [id]);
    done(null, rows[0]);
});
