const { Op } = require('sequelize');
const { Department, User } = require('../models/index');

const departmentDao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      Department.create(params).then((inserted) => {
        resolve(inserted);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 리스트 조회
  selectList(params) {
    // where 검색 조건
    const setQuery = {};
    if (params.ids) {
      setQuery.where = {
        ...setQuery.where,
        id: params.ids, // in 검색 ids ex) [1,2,3,4]
      };
    }
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` }, // like검색
      };
    }
    if (params.code) {
      setQuery.where = {
        ...setQuery.where,
        code: params.code, // = 검색
      };
    }

    // order by 정렬 조건
    setQuery.order = [['id', 'DESC']];
    if (params.limit) {
      setQuery.limit = params.limit;
    }
    if (params.offset) {
      setQuery.offset = params.offset;
    }

    return new Promise((resolve, reject) => {
      Department.findAndCountAll({
        ...setQuery,
        include: [
          {
            model: User,
            as: 'Users',
            attributes: ['id', 'name', 'userid', 'role', 'email', 'phone', 'createdAt'],
          },
        ],
      }).then((selectedList) => {
        console.log(selectedList);
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 상세정보 조회
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      Department.findByPk(params.id, {
        include: [
          {
            model: User,
            as: 'Users',
            attributes: User.getIncludeAttributes(),
          },
        ],
      }).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      Department.update(
        params,
        {
          where: { id: params.id },
        },
      ).then(([updated]) => {
        resolve({ updatedCount: updated });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 삭제
  delete(params) {
    return new Promise((resolve, reject) => {
      Department.destroy({
        where: { id: params.id },
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
  deleteForce(params) {
    return new Promise((resolve, reject) => {
      Department.destroy({
        where: { id: params.id },
        force: true,
      }).then((deleted) => {
        resolve({ deletedCount: deleted });
      }).catch((err) => {
        reject(err);
      });
    });
  },
};

module.exports = departmentDao;
