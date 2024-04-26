const express = require('express');
const logger = require('../lib/logger');
const uploadRouter = require('./upload');
const departmentRouter = require('./department');
const userRouter = require('./user');
const authRouter = require('./auth');
const boardRouter = require('./board');
const postRouter = require('./post');
const commentRouter = require('./comment');
const weatherRouter = require('./weather');
const loginRouter = require('./login');
const mainRouter = require('./category');

const router = express.Router();

router.use('/uploads', uploadRouter);
router.use('/departments', departmentRouter);
router.use('/users', userRouter);
router.use('/auths', authRouter);
router.use('/boards', boardRouter);
router.use('/posts', postRouter);
router.use('/comments', commentRouter);
router.use('/weathers', weatherRouter);
router.use('/login', loginRouter);
router.use('/main', mainRouter);

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/log-test', (req, res, next) => {
  logger.error('에러입니다.');
  logger.warn('경고입니다!');
  logger.info('정보로그입니다!');
  logger.debug('로그테스트 debug!');

  logger.silly('로그테스트 silly!');
  logger.verbose('로그테스트 verbose!');
  res.send('log test ok!');
});

router.get('/log-error', (req, res, next) => {
  logger.error('test log error');
  // 로직들 여기에 입력
  // service 로직
  res.send('log test ok!');
});
router.get('/log-warn', (req, res, next) => {
  logger.warn('test log warn');
  res.send('log test ok!');
});
router.get('/log-info', (req, res, next) => {
  logger.info('test log info');
  res.send('log test ok!');
});
router.get('/log-debug', (req, res, next) => {
  logger.debug('test log debug');
  res.send('log test ok!');
});

module.exports = router;
