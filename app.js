var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var config = require('./config');
var passport = require('passport');
var authenticate = require('./authenticate');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hostRouter = require('./routes/hostRouter');
var logRouter = require('./routes/logRouter');
var podRouter = require('./routes/podRouter');
var containerRouter = require('./routes/containerRouter');
var resourceRouter = require('./routes/resourceRouter');
const whatsappRouter = require('./routes/whatsappRouter');

const mongoose = require('mongoose');

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log('Connected correctly to server');
}, (err) => {console.log(err);})

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

app.use('/api/hosts', hostRouter);
app.use('/api/logs', logRouter);
app.use('/api/pods', podRouter);
app.use('/api/containers', containerRouter);
app.use('/api/resources', resourceRouter);
app.use('/api/whatsapp', whatsappRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


