const express = require('express');
const logger = require('../lib/logger');

const router = express.Router();
const boardService = require('../service/boardService');
const { isLoggedIn } = require('../lib/middleware');

// 게시판 입력
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const { tokenUser } = req;
    const params = {
      userId: tokenUser ? tokenUser.id : req.body.userId,
      title: req.body.title,
      imagePath: req.body.imagePath,
      tag: req.body.tag,
    };
    logger.info(`router/board.js ${{ reqParams: JSON.stringify(params) }}`);

    if (!params.title) {
      const err = new Error('Not allowed null (title)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }

    const result = await boardService.reg(params);
    logger.info(`router/board.js.reg.result: ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    logger.error(`router/board.js: ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const params = {
      ids: req.query.ids ? req.query.ids.split(',') : null,
      userIds: req.query.userIds ? req.query.userIds.split(',') : null,
      title: req.query.title,
      tags: req.query.tags ? req.query.tags.split(',') : null,
      limit: req.query.limit,
      offset: req.query.offset,

    };

    logger.info(`(board.list.params) ${JSON.stringify(params)}`);

    const result = await boardService.list(params);
    logger.info(`(board.list.result) ${JSON.stringify(result)}`);

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
    logger.info(`(board.info.params) ${JSON.stringify(params)}`);

    const result = await boardService.info(params);
    logger.info(`(board.info.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

// 수정
router.put('/:id', isLoggedIn, async (req, res) => {
  try {
    const { tokenUser } = req;
    const params = {
      id: req.params.id,
      userId: tokenUser ? tokenUser.id : req.body.userId,
      title: req.body.title,
      iamgePath: req.body.iamgePath,
      tag: req.body.tag,
    };
    logger.info(`(board.update.params) ${JSON.stringify(params)}`);

    const result = await boardService.edit(params);
    logger.info(`(board.update.result) ${JSON.stringify(result)}`);

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
    logger.info(`(board.delete.params) ${JSON.stringify(params)}`);

    const result = await boardService.delete(params);
    logger.info(`(board.delete.result) ${JSON.stringify(result)}`);

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
    logger.info(`(board.delete.params) ${JSON.stringify(params)}`);

    const result = await boardService.deleteForce(params);
    logger.info(`(board.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
