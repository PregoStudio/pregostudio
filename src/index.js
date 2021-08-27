const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');

const { database } = require('./keys');

// Init
const app = express();
require('./lib/passport');
require('./lib/passportdos');

// Sett
app.set('port', process.env.PORT || 13000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

// Middle
app.use(session({
    secret: 'teacompanonode',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

// Global
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});

// Routes
app.use(require('./routes'));
app.use(require('./routes/auth'));
app.use(require('./routes/authdos'));
app.use(require('./routes/enfermeras'));
app.use(require('./routes/servicios'));
app.use('/control', require('./routes/control'));
app.use('/usuarios', require('./routes/users'));

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Start
app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto', app.get('port'));
});