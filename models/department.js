const Sequelize = require('sequelize');

module.exports = class Department extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      name: {
        type: Sequelize.STRING(10),
      },
      code: {
        type: Sequelize.STRING(50),
      },
      description: {
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
    // 1개의 부서는 여러개의 유저를 가지고있다.
    db.Department.hasMany(db.User, { foreignKey: { name: 'departmentId', onDelete: 'SET NULL', as: 'Users' } });
  }

  static getIncludeAttributes() {
    return ['id', 'name', 'code', 'createdAt'];
  }
};
