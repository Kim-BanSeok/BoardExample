const express = require('express');
const logger = require('../lib/logger');

const router = express.Router();
const departmentService = require('../service/departmentService');
const { isLoggedIn } = require('../lib/middleware');

// 부서 입력
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const params = {
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
    };
    logger.info(`router/department.js ${{ reqParams: JSON.stringify(params) }}`);

    if (!params.name) {
      const err = new Error('Not allowed null (name)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }

    const result = await departmentService.reg(params);
    logger.info(`router/department.js.reg.result: ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    logger.error(`router/department.js: ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const params = {
      ids: req.query.ids ? req.query.ids.split(',') : null,
      name: req.query.name,
      code: req.query.code,
      limit: req.query.limit,
      offset: req.query.offset,

    };

    logger.info(`(department.list.params) ${JSON.stringify(params)}`);

    const result = await departmentService.list(params);
    logger.info(`(department.list.result) ${JSON.stringify(result)}`);

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
    logger.info(`(department.info.params) ${JSON.stringify(params)}`);

    const result = await departmentService.info(params);
    logger.info(`(department.info.result) ${JSON.stringify(result)}`);

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
      name: req.body.name,
      code: req.body.code,
      description: req.body.description,
    };
    logger.info(`(department.update.params) ${JSON.stringify(params)}`);

    const result = await departmentService.edit(params);
    logger.info(`(department.update.result) ${JSON.stringify(result)}`);

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
    logger.info(`(department.delete.params) ${JSON.stringify(params)}`);

    const result = await departmentService.delete(params);
    logger.info(`(department.delete.result) ${JSON.stringify(result)}`);

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
    logger.info(`(department.delete.params) ${JSON.stringify(params)}`);

    const result = await departmentService.deleteForce(params);
    logger.info(`(department.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
