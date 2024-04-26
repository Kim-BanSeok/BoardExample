const logger = require('../lib/logger');
const postDao = require('../dao/postDao');
const postUserLikeJoinDao = require('../dao/postUserLikeJoinDao');
const postUserHateJoinDao = require('../dao/postUserHateJoinDao');

const postService = {
  async reg(params) {
    let inserted = null;
    try {
      inserted = await postDao.insert(params);
      logger.debug(`postService.reg : ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`postService.reg: ${err}`);
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
      result = await postDao.selectList(params);
      logger.debug(`(postService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(postService.list) ${err.toString()}`);
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
      result = await postDao.selectInfo(params);
      logger.debug(`(postService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(postService.info) ${err.toString()}`);
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
      result = await postDao.update(params);
      logger.debug(`(postService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(postService.edit) ${err.toString()}`);
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
      result = await postDao.delete(params);
      logger.debug(`(postService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(postService.delete) ${err.toString()}`);
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
      result = await postDao.deleteForce(params);
      logger.debug(`(postService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(postService.delete) ${err.toString()}`);
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
      inserted = await postUserLikeJoinDao.insert(params);
      console.log('🚀 ~ regLike ~ inserted:', inserted);
      logger.debug(`postService.reg : ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`postService.reg: ${err}`);
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
      inserted = await postUserLikeJoinDao.deleteForce(params);
      logger.debug(`postService.reg : ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`postService.reg: ${err}`);
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
      inserted = await postUserHateJoinDao.insert(params);
      logger.debug(`postService.reg : ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`postService.reg: ${err}`);
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
      inserted = await postUserHateJoinDao.deleteForce(params);
      logger.debug(`postService.reg : ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`postService.reg: ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(inserted);
    });
  },
};

module.exports = postService;
