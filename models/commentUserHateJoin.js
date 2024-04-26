const Sequelize = require('sequelize');

module.exports = class CommentUserHateJoin extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      commentId: {
        type: Sequelize.INTEGER,
        unique: 'commentUserHateUnique',
      },
      userId: {
        type: Sequelize.INTEGER,
        unique: 'commentUserHateUnique',
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
    return ['id', 'commentId', 'userId', 'createdAt'];
  }
};
