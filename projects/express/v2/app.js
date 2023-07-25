
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const articlesRouter = require('./routes/articles');
const helloRouter = require('./routes/hello');
const usersRouter = require('./routes/users');
const bicycleRouter = require('./routes/bicycle');
const rootRouter = require('./routes/root');
const aggregateRouter = require('./routes/aggregate');
const pollutionRouter = require('./routes/pollution');

const labRouter_3_1 = require('./routes/lab.3.1');
const labRouter_3_2 = require('./routes/lab.3.2');
const labRouter_5_1 = require('./routes/lab.5.1');
const labRouter_6_1 = require('./routes/lab.6.1');

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
app.use('/aggregate', aggregateRouter);
app.use('/articles', articlesRouter);
app.use('/bicycle', bicycleRouter);
app.use('/hello', helloRouter);
app.use('/root', rootRouter);
app.use('/users', usersRouter);
app.use('/pollution', pollutionRouter);
app.use('/lab-3-1', labRouter_3_1);
app.use('/lab-3-2', labRouter_3_2);
app.use('/lab-5-1/boat', labRouter_5_1);
app.use('/lab-6-1/boat', labRouter_6_1);

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
  res.send({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  });
  // res.render('error');
});

module.exports = app;