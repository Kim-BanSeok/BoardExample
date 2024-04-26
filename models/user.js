const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      departmentId: {
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING(100),
      },
      userid: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(500),
        allowNull: false,
      },
      role: {
        type: Sequelize.STRING(20),
      },
      email: {
        type: Sequelize.STRING(255),
      },
      phone: {
        type: Sequelize.STRING(255),
      },
      updatedPwDate: {
        type: Sequelize.DATE,
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
    // 1개의 유저는 무조건 1개의 부서를 가지고있다.
    db.User.belongsTo(db.Department, { foreignKey: { name: 'departmentId', onDelete: 'SET NULL', as: 'Department' } });
    db.User.hasMany(db.Board, { foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'Boards' } });
    db.User.hasMany(db.Post, { foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'Posts' } });
    db.User.hasMany(db.Comment, { foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'Comments' } });
    db.User.belongsToMany(db.Post, {
      through: db.PostUserLikeJoin,
      foreignKey: 'postId',
      otherKey: 'userId',
      as: 'LikePosts',
    });
    db.User.belongsToMany(db.Post, {
      through: db.PostUserHateJoin,
      foreignKey: 'postId',
      otherKey: 'userId',
      as: 'HatePosts',
    });
    db.User.belongsToMany(db.Comment, {
      through: db.CommentUserLikeJoin,
      foreignKey: 'commentId',
      otherKey: 'userId',
      as: 'LikeComments',
    });
    db.User.belongsToMany(db.Comment, {
      through: db.CommentUserHateJoin,
      foreignKey: 'commentId',
      otherKey: 'userId',
      as: 'HateComments',
    });
  }

  static getIncludeAttributes() {
    return ['id', 'name', 'userid', 'role', 'email', 'phone', 'createdAt'];
  }
};
