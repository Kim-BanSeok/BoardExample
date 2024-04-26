const express = require('express');
const logger = require('../lib/logger');

const router = express.Router();
const commentService = require('../service/commentService');
const { isLoggedIn } = require('../lib/middleware');

// 부서 입력
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const { tokenUser } = req;
    const params = {
      postId: req.body.postId,
      userId: tokenUser ? tokenUser.id : req.body.userId,
      content: req.body.content,
    };
    logger.info(`router/comment.js ${{ reqParams: JSON.stringify(params) }}`);

    if (!params.postId) {
      const err = new Error('Not allowed null (postId)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }

    const result = await commentService.reg(params);
    logger.info(`router/comment.js.reg.result: ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    logger.error(`router/comment.js: ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const params = {
      ids: req.query.ids ? req.query.ids.split(',') : null,
      postIds: req.query.postIds ? req.query.postIds.split(',') : null,
      userIds: req.query.userIds ? req.query.userIds.split(',') : null,
      limit: req.query.limit,
      offset: req.query.offset,
    };

    logger.info(`(comment.list.params) ${JSON.stringify(params)}`);

    const result = await commentService.list(params);
    logger.info(`(comment.list.result) ${JSON.stringify(result)}`);

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
    logger.info(`(comment.info.params) ${JSON.stringify(params)}`);

    const result = await commentService.info(params);
    logger.info(`(comment.info.result) ${JSON.stringify(result)}`);

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
      // postId: req.body.postId,
      // userId: req.body.userId,
      content: req.body.content,
    };
    logger.info(`(comment.update.params) ${JSON.stringify(params)}`);

    const result = await commentService.edit(params);
    logger.info(`(comment.update.result) ${JSON.stringify(result)}`);

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
    logger.info(`(comment.delete.params) ${JSON.stringify(params)}`);

    const result = await commentService.delete(params);
    logger.info(`(comment.delete.result) ${JSON.stringify(result)}`);

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
    logger.info(`(comment.delete.params) ${JSON.stringify(params)}`);

    const result = await commentService.deleteForce(params);
    logger.info(`(comment.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});

module.exports = router;
