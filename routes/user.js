const express = require('express');
const logger = require('../lib/logger');

const router = express.Router();
const userService = require('../service/userService');
const { isLoggedIn } = require('../lib/middleware');

// 부서 입력
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      departmentId: req.body.departmentId,
      name: req.body.name,
      userid: req.body.userid,
      password: req.body.password,
      role: req.body.role,
      email: req.body.email,
      phone: req.body.phone,
    };
    logger.info(`router/user.js ${{ reqParams: JSON.stringify(params) }}`);

    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }

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

    const result = await userService.reg(params);
    logger.info(`router/user.js.reg.result: ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    logger.error(`router/user.js: ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const params = {
      ids: req.query.ids ? req.query.ids.split(',') : null,
      departmentIds: req.query.departmentIds ? req.query.departmentIds.split(',') : null,
      name: req.query.name,
      userid: req.query.userid,
      role: req.query.role,
      email: req.query.email,
      phone: req.query.phone,
      limit: req.query.limit,
      offset: req.query.offset,
    };

    logger.info(`(user.list.params) ${JSON.stringify(params)}`);

    const result = await userService.list(params);
    logger.info(`(user.list.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 상세정보 조회
router.get('/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(user.info.params) ${JSON.stringify(params)}`);

    const result = await userService.info(params);
    logger.info(`(user.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 수정
router.put('/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
      departmentId: req.body.departmentId,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    logger.info(`(user.update.params) ${JSON.stringify(params)}`);

    const result = await userService.edit(params);
    logger.info(`(user.update.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 삭제
router.delete('/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(user.delete.params) ${JSON.stringify(params)}`);

    const result = await userService.delete(params);
    logger.info(`(user.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});
// 삭제
router.delete('/force/:id', isLoggedIn, async (req, res) => {
  try {
    const params = {
      id: req.params.id,
    };
    logger.info(`(user.delete.params) ${JSON.stringify(params)}`);

    const result = await userService.deleteForce(params);
    logger.info(`(user.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
