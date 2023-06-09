const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const http = require('http');
const { Readable } = require('stream');

const app = express();

async function* upper(res) {
  let rawData = '';
  for await (const chunk of res) {
    rawData += chunk;
  }
  yield rawData.toUpperCase();
}

app.get('/', (req, res, next) => {
  const { url } = req.query;
  try {
    new URL(url);
  } catch (err) {
    return res.status(400).send('Bad Request');
  }

  http
    .get(url, (response) => {
      response.setEncoding('utf8');
      const transformedData = Readable.from(upper(response));
      transformedData.pipe(res);
    })
    .on('error', (error) => {
      next(error);
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
