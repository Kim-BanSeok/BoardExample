const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.INTEGER,
      },
      postId: {
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.TEXT,
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
    db.Comment.belongsTo(db.User, { foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'User' } });
    db.Comment.belongsTo(db.Post, { foreignKey: { name: 'postId', onDelete: 'SET NULL', as: 'Post' } });
    db.Comment.belongsToMany(db.User, {
      through: db.CommentUserLikeJoin,
      foreignKey: 'userId',
      otherKey: 'commentId',
      as: 'Likes',
    });
    db.Comment.belongsToMany(db.User, {
      through: db.CommentUserHateJoin,
      foreignKey: 'userId',
      otherKey: 'commentId',
      as: 'Hates',
    });
  }

  static getIncludeAttributes() {
    return ['id', 'userId', 'content', 'createdAt'];
  }
};
