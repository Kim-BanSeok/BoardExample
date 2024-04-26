const Sequelize = require('sequelize');

module.exports = class CommentUesrLikeJoin extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      postId: {
        type: Sequelize.INTEGER,
        unique: 'commentUserLikeUnique',
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: 'commentUserLikeUnique',
      },
    }, {
      sequelize,
      // tableName: 'tableName', // table명을 수동으로 생성 함
      // freezeTableName: true, // true: table명의 복수형 변환을 막음
      underscored: true, // true: underscored, false: camelCase
      timestamps: true, // createAt, updatedAt
      paranoid: true, // deletedAt
    });
  }

  static associate(db) {
  }

  static getIncludeAttributes() {
    return ['id', 'postId', 'userId', 'createdAt'];
  }
};
