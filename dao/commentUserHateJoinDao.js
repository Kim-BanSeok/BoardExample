const { Op } = require('sequelize');
const {
  PostUserHateJoin, User, Board, Comment,
} = require('../models/index');

const postUserHateJoinDao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      PostUserHateJoin.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      PostUserHateJoin.destroy({
        where: { postIds: params.postIds, userId: params.userId },
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  deleteForce(params) {
    return new Promise((resolve, reject) => {
      PostUserHateJoin.destroy({
        where: { postId: params.postId, userId: params.userId },
        force: true,
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = postUserHateJoinDao;
