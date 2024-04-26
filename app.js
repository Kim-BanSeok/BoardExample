/* eslint-disable import/no-extraneous-dependencies */
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const bodyParger = require('body-parser');
const cors = require('cors');
const corsConfig = require('./config/corsConfig.json');
const models = require('./models/index');
const indexRouter = require('./routes/index');
const logger = require('./lib/logger');

dotenv.config();
const { NODE_ENV, PORT, LOGGER_LEVEL } = process.env;
console.log('env:', NODE_ENV, PORT, LOGGER_LEVEL);
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParger.urlencoded({ extended: true }));
app.use(bodyParger.json());
app.use(cors(corsConfig));
app.use('/', indexRouter);
app.use(express.static(path.join(__dirname, 'uploads')));
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
logger.info('server start!');

models.sequelize.authenticate().then(() => {
  logger.info('DB connection Success');

  models.sequelize.sync().then(() => {
    logger.info('Sequelize sync Success!!!!!!');
  }).catch((error) => {
    logger.error(error);
  });
}).catch((error) => {
  logger.error(error);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
