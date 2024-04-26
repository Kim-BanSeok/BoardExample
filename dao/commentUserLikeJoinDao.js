const { Op } = require('sequelize');
const {
  CommentUserLikeJoin, User, Board, Comment,
} = require('../models/index');

const commentUserLikeJoinDao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      CommentUserLikeJoin.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      CommentUserLikeJoin.destroy({
        where: { commentId: params.commentId, userId: params.userId },
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  deleteForce(params) {
    return new Promise((resolve, reject) => {
      CommentUserLikeJoin.destroy({
        where: { commentId: params.commentId, userId: params.userId },
        force: true,
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = commentUserLikeJoinDao;
