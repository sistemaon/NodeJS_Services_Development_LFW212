const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const helloRouter = require('./routes/hello');
const hnStreamRouter = require('./routes/hn-stream');
const bikeRouter = require('./routes/bike');
const l31Router = require('./l.3.1/index');
const l32Router = require('./l.3.2/index');
const l41Router = require('./l.4.1/index');
const l42Router = require('./l.4.2/index');
const l51Router = require('./l.5.1/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/greet', helloRouter);
app.use('/articles', hnStreamRouter);
app.use('/bicycle', bikeRouter);

app.use('/l-3-1', l31Router);
app.use('/l-3-2', l32Router);
app.use('/me', l41Router);
app.use('/data', l42Router);
app.use('/boat', l51Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.type('text/html');
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
