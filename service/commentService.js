const logger = require('../lib/logger');
const commentDao = require('../dao/commentDao');

const commentUserLikeJoinDao = require('../dao/commentUserLikeJoinDao');
const commentUserHateJoinDao = require('../dao/commentUserHateJoinDao');

const commentService = {
  async reg(params) {
    let inserted = null;
    try {
      inserted = await commentDao.insert(params);
      logger.debug(`commentService.reg : ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`commentService.reg: ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },
  // selectList
  async list(params) {
    let result = null;

    try {
      result = await commentDao.selectList(params);
      logger.debug(`(commentService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(commentService.list) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // selectInfo
  async info(params) {
    let result = null;

    try {
      result = await commentDao.selectInfo(params);
      logger.debug(`(commentService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(commentService.info) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // update
  async edit(params) {
    let result = null;

    try {
      result = await commentDao.update(params);
      logger.debug(`(commentService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(commentService.edit) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  // delelte
  async delete(params) {
    let result = null;

    try {
      result = await commentDao.delete(params);
      logger.debug(`(commentService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(commentService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  async deleteForce(params) {
    let result = null;

    try {
      result = await commentDao.deleteForce(params);
      logger.debug(`(commentService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(commentService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },

  async regLike(params) {
    let inserted = null;
    try {
      inserted = await commentUserLikeJoinDao.insert(params);
      logger.debug(`commentService.reg : ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`commentService.reg: ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },
  async cancelLike(params) {
    let inserted = null;
    try {
      inserted = await commentUserLikeJoinDao.deleteForce(params);
      logger.debug(`commentService.reg : ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`commentService.reg: ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },
  async regHate(params) {
    let inserted = null;
    try {
      inserted = await commentUserHateJoinDao.insert(params);
      logger.debug(`commentService.reg : ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`commentService.reg: ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },
  async cancelHate(params) {
    let inserted = null;
    try {
      inserted = await commentUserHateJoinDao.deleteForce(params);
      logger.debug(`commentService.reg : ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`commentService.reg: ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },
};

module.exports = commentService;
