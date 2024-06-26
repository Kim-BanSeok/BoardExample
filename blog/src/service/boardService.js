const logger = require('../lib/logger');
const boardDao = require('../dao/boardDao');

const boardService = {
  async reg(params) {
    let inserted = null;
    try {
      inserted = await boardDao.insert(params);
      logger.debug(`boardService.reg : ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`boardService.reg: ${err}`);
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
      result = await boardDao.selectList(params);
      logger.debug(`(boardService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(boardService.list) ${err.toString()}`);
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
      result = await boardDao.selectInfo(params);
      logger.debug(`(boardService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(boardService.info) ${err.toString()}`);
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
      result = await boardDao.update(params);
      logger.debug(`(boardService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(boardService.edit) ${err.toString()}`);
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
      result = await boardDao.delete(params);
      logger.debug(`(boardService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(boardService.delete) ${err.toString()}`);
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
      result = await boardDao.deleteForce(params);
      logger.debug(`(boardService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(boardService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
};

module.exports = boardService;
