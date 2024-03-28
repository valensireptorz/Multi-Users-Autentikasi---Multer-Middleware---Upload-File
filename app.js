// Import modul dan dependencies yang diperlukan
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('express-flash');
var session = require('express-session');
const MemoryStore = require('session-memory-store')(session);

// Import file-route yang dibutuhkan
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var kategoriRouter = require('./routes/kategori');
var mahasiswaRouter = require('./routes/mahasiswa');
var pendidikanRouter = require('./routes/pendidikan');
var keahlianRouter = require('./routes/keahlian');
var pemilikRouter = require ('./routes/pemilik');
var dpiRouter = require ('./routes/dpi');
var alat_tangkapRouter= require ('./routes/alat_tangkap');
var kapalRouter = require ('./routes/kapal');
var indexRouter = require('./routes/index');
var superusersRouter = require('./routes/superusers');
var produkRouter = require('./routes/produk');
// Inisialisasi aplikasi Express
var app = express();

// Setup view engine dan lokasi folder views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup session
app.use(session({
  cookie: {
      maxAge: 60000000000,
      secure: false,
      httpOnly: true,
      samesite:'strict',
  },
  store: new MemoryStore(),
  saveUninitialized: true,
  resave: true,
  secret: 'secret'
}));

// Setup flash messages
app.use(flash());

// Routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/kategori', kategoriRouter);
app.use('/mahasiswa', mahasiswaRouter);
app.use('/pendidikan',pendidikanRouter);
app.use('/keahlian',keahlianRouter);
app.use('/pemilik',pemilikRouter);
app.use('/dpi',dpiRouter);
app.use('/alat_tangkap',alat_tangkapRouter);
app.use('/kapal',kapalRouter);
app.use('/superusers',superusersRouter);
app.use('/produk',produkRouter);
// Middleware untuk menangani error 404 (Not Found)
app.use(function(req, res, next) {
  next(createError(404));
});

// Middleware untuk menangani error lainnya
app.use(function(err, req, res, next) {
  // Set local variables, hanya memberikan error di environment development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render halaman error
  res.status(err.status || 500);
  res.render('error');
});

// Export aplikasi Express
module.exports = app;
