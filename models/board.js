const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING(100),
      },
      imagePath: {
        type: Sequelize.STRING(500),
      },
      tag: {
        type: Sequelize.ARRAY(Sequelize.STRING(50)),
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
    db.Board.belongsTo(db.User, { foreignKey: { name: 'userId', onDelete: 'SET NULL', as: 'User' } });
    db.Board.hasMany(db.Post, { foreignKey: { name: 'boardId', onDelete: 'SET NULL', as: 'Posts' } });
  }

  static getIncludeAttributes() {
    return ['id', 'userId', 'title', 'imagePath', 'tag', 'createdAt'];
  }
};
