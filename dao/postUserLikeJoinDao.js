const { Op } = require('sequelize');
const {
  PostUserLikeJoin, User, Board, Comment,
} = require('../models/index');

const postUserLikeJoinDao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      console.log('🚀 ~ PostUserLikeJoin.create ~ params:', params);
      PostUserLikeJoin.create({ userId: 37, postId: 4 }).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      PostUserLikeJoin.destroy({
        where: { postId: params.postId, userId: params.userId },
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  deleteForce(params) {
    return new Promise((resolve, reject) => {
      PostUserLikeJoin.destroy({
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

module.exports = postUserLikeJoinDao;
