const logger = require('../lib/logger');
const userDao = require('../dao/userDao');
const hashUtil = require('../lib/hashUtil');
const tokenUtil = require('../lib/tokenUtil');

const userService = {
  async reg(params) {
    let inserted = null;
    let hashPassword = null;
    try {
      hashPassword = await hashUtil.makePasswordHash(params.password);
      logger.debug(`userService.reg - hashPassword: ${JSON.stringify(params.password)}`);
    } catch (err) {
      logger.error(`userService.reg - hashPassword: ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    const newParams = {
      ...params,
      password: hashPassword,
    };

    try {
      inserted = await userDao.insert(newParams);
      console.log('🚀 ~ reg ~ inserted:', inserted);
      logger.debug(`userService.reg : ${JSON.stringify(inserted)}`);
    } catch (err) {
      logger.error(`userService.reg: ${err}`);
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
      result = await userDao.selectList(params);
      logger.debug(`(userService.list) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.list) ${err.toString()}`);
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
      result = await userDao.selectInfo(params);
      logger.debug(`(userService.info) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.info) ${err.toString()}`);
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
      result = await userDao.update(params);
      logger.debug(`(userService.edit) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.edit) ${err.toString()}`);
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
      result = await userDao.delete(params);
      logger.debug(`(userService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.delete) ${err.toString()}`);
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
      result = await userDao.deleteForce(params);
      logger.debug(`(userService.delete) ${JSON.stringify(result)}`);
    } catch (err) {
      logger.error(`(userService.delete) ${err.toString()}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve) => {
      resolve(result);
    });
  },
  async login(params) {
    let tokenResult = null;
    let selectedUserInfo = null;
    try {
      // 1. 사용자 조회 (로그인용)
      selectedUserInfo = await userDao.selectUser(params);
      // 1-1. 사용자 조회된게 있는지 확인후 없으면 에러처리 및 함수 종료
      if (!selectedUserInfo) {
        const err = new Error(`userService.login, 일치하는 유저정보가 없습니다 (userid: ${JSON.stringify(params.userid)})`);
        logger.error(err.toString());
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // 2. 사용자 조회한걸로 params.password랑 조회된 password랑 비교(hashUtil.checkPassword~~ 활용)
    try {
      // eslint-disable-next-line max-len
      const checkPassword = await hashUtil.checkPasswordHash(params.password, selectedUserInfo.password);
      // 2-1. 패스워드 불일치시 에러처리
      if (checkPassword === false) {
        const err = new Error('패스워드가 일치하지 않습니다.');
        logger.error(err.toString());
        return new Promise((resolve, reject) => {
          reject(err);
        });
      }
    } catch (err) {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }
    // 3. 토큰발급 후 토큰 리턴
    try {
      // const { password, ...makeTokenParams } = selectedUserInfo;
      // const token = await tokenUtil.makeToken(makeTokenParams);
      tokenResult = tokenUtil.makeToken({
        id: selectedUserInfo.id,
        userid: selectedUserInfo.userid,
        name: selectedUserInfo.name,
        role: selectedUserInfo.role,
      });

      logger.debug(`userService.login : ${JSON.stringify(tokenResult)}`);
    } catch (err) {
      logger.error(`userService.login: ${err}`);
      return new Promise((resolve, reject) => {
        reject(err);
      });
    }

    return new Promise((resolve, reject) => {
      resolve(tokenResult);
    });
  },
};

module.exports = userService;
