const express = require('express');
const logger = require('../lib/logger');

const router = express.Router();
const postService = require('../service/postService');
const { isLoggedIn } = require('../lib/middleware');

router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const { tokenUser } = req;

    const params = {
      userId: tokenUser ? tokenUser.id : req.body.userId,
      boardId: req.body.boardId,
      title: req.body.title,
      content: req.body.content,
      iamgePath: req.body.iamgePath,
    };
    logger.info(`router/post.js ${{ reqParams: JSON.stringify(params) }}`);

    if (!params.title) {
      const err = new Error('Not allowed null (title)');
      logger.error(err.toString());
      res.status(500).json({ err: err.toString() });
    }

    const result = await postService.reg(params);
    logger.info(`router/post.js.reg.result: ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    logger.error(`router/post.js: ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});

// 리스트 조회
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const params = {
      ids: req.query.ids ? req.query.ids.split(',') : null,
      boardIds: req.query.boardIds ? req.query.boardIds.split(',') : null,
      userIds: req.query.userIds ? req.query.userIds.split(',') : null,
      title: req.query.title,
      limit: req.query.limit,
      offset: req.query.offset,
    };

    logger.info(`(post.list.params) ${JSON.stringify(params)}`);

    const result = await postService.list(params);
    logger.info(`(post.list.result) ${JSON.stringify(result)}`);

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
    logger.info(`(post.info.params) ${JSON.stringify(params)}`);

    const result = await postService.info(params);
    logger.info(`(post.info.result) ${JSON.stringify(result)}`);

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
      content: req.body.content,
      iamgePath: req.body.iamgePath,
    };
    logger.info(`(post.update.params) ${JSON.stringify(params)}`);

    const result = await postService.edit(params);
    logger.info(`(post.update.result) ${JSON.stringify(result)}`);

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
    logger.info(`(post.delete.params) ${JSON.stringify(params)}`);

    const result = await postService.delete(params);
    logger.info(`(post.delete.result) ${JSON.stringify(result)}`);

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
    logger.info(`(post.delete.params) ${JSON.stringify(params)}`);

    const result = await postService.deleteForce(params);
    logger.info(`(post.delete.result) ${JSON.stringify(result)}`);

    // 최종 응답
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ err: err.toString() });
  }
});
router.post('/like', isLoggedIn, async (req, res, next) => {
  try {
    const { tokenUser } = req;

    const params = {
      userId: tokenUser ? tokenUser.id : req.body.userId,
      postId: req.body.postId,
      // UserId: tokenUser ? tokenUser.id : req.body.userId,
      // PostId: req.body.postId,
    };
    console.log('🚀 ~ router.post ~ params:', params);

    if (!params.userId) {
      const err = new Error('Not allowed null (userId)');
      logger.error(err.toString());
      res.status(400).json({ err: err.toString() });
    }

    if (!params.postId) {
      const err = new Error('Not allowed null (postId)');
      logger.error(err.toString());
      res.status(400).json({ err: err.toString() });
    }
    logger.info(`router/post.js ${{ reqParams: JSON.stringify(params) }}`);

    const result = await postService.regLike(params);
    logger.info(`router/post.js.regLike.result: ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    logger.error(`router/post.js: ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});
router.post('/hate', isLoggedIn, async (req, res, next) => {
  try {
    const { tokenUser } = req;

    const params = {
      userId: tokenUser ? tokenUser.id : req.body.userId,
      postId: req.body.postId,
      // UserId: tokenUser ? tokenUser.id : req.body.userId,
      // PostId: req.body.postId,
    };
    logger.info(`router/post.js ${{ reqParams: JSON.stringify(params) }}`);

    const result = await postService.regHate(params);
    logger.info(`router/post.js.regHate.result: ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    logger.error(`router/post.js: ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});
router.delete('/like/:id', isLoggedIn, async (req, res, next) => {
  try {
    const { tokenUser } = req;

    const params = {
      postId: req.params.id,
      userId: tokenUser ? tokenUser.id : req.body.userId,
    };
    logger.info(`router/post.js ${{ reqParams: JSON.stringify(params) }}`);

    const result = await postService.cancelLike(params);
    logger.info(`router/post.js.regLike.result: ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    logger.error(`router/post.js: ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});
router.delete('/hate/:id', isLoggedIn, async (req, res, next) => {
  try {
    const { tokenUser } = req;

    const params = {
      postId: req.params.id,
      userId: tokenUser ? tokenUser.id : req.body.userId,
    };
    logger.info(`router/post.js ${{ reqParams: JSON.stringify(params) }}`);

    const result = await postService.cancelHate(params);
    logger.info(`router/post.js.regHate.result: ${JSON.stringify(result)}`);

    res.status(200).json(result);
  } catch (err) {
    logger.error(`router/post.js: ${err.toString()}`);
    res.status(500).json({ err: err.toString() });
  }
});
module.exports = router;
