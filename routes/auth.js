const express = require('express');
const logger = require('../lib/logger');

const router = express.Router();
const userService = require('../service/userService');

// 로그인
router.post('/login', async (req, res, next) => {
  console.log('🚀 ~ router.post ~ params:');
  try {
    const params = {
      userid: req.body.userid,
      password: req.body.password,
    };

    logger.info(`router/auth.js ${{ reqParams: JSON.stringify(params) }}`);

    if (!params.userid) {
      const err = new Error('Not allowed null (userid)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }

    if (!params.password) {
      const err = new Error('Not allowed null (password)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }

    const result = await userService.login(params);
    console.log('🚀 ~ router.post ~ result:', result);
    logger.info(`router/auth.js.reg.result: ${JSON.stringify(result)}`);
    res.render('category');
    res.status(200).json(result);
  } catch (err) {
    logger.error(`router/auth.js: ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
