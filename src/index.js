const express = require('express');
const bodyParser = require('body-parser');
//const request = require('request');
//const secretKey = '6LcAQioaAAAAAPzVsOtXMQkWIST80eeXVuWhJdzo';
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const mySQLStore = require('express-mysql-session');
const passport = require('passport');
const robots = require('express-robots-txt');

const { database } = require('./keys');

//Inicializar
const app = express();
require('./lib/passport');

//Settings
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

//Middlewares
app.use(session({
  secret: 'pregohandlebarssession',
  resave: false,
  saveUninitialized: false,
  store: new mySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//Globales
app.use((req, res, next) => {
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.user = req.user;
  next();
});

//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use(require('./routes/control'));
app.use('/models', require('./routes/models'));

//Public
app.use(express.static(path.join(__dirname, 'public')));
app.use(robots(path.join(__dirname, '/robots.txt')));

//Starting
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});