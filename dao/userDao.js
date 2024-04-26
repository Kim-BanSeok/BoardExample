const { Op } = require('sequelize');
const { User, Department } = require('../models/index');

const userDao = {
  insert(params) {
    console.log('🚀 ~ insert ~ params:', params);
    return new Promise((resolve, reject) => {
      User.create(params).then((inserted) => {
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
    if (params.departmentIds) {
      setQuery.where = {
        ...setQuery.where,
        departmentId: params.departmentIds, // in 검색 ids ex) [1,2,3,4]
      };
    }
    if (params.name) {
      setQuery.where = {
        ...setQuery.where,
        name: { [Op.like]: `%${params.name}%` }, // like검색
      };
    }
    if (params.userid) {
      setQuery.where = {
        ...setQuery.where,
        userid: { [Op.like]: `%${params.userid}%` }, // like검색
      };
    }
    if (params.role) {
      setQuery.where = {
        ...setQuery.where,
        role: params.role, // = 검색
      };
    }
    if (params.email) {
      setQuery.where = {
        ...setQuery.where,
        email: params.email, // = 검색
      };
    }
    if (params.phone) {
      setQuery.where = {
        ...setQuery.where,
        phone: params.phone, // = 검색
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
      User.findAndCountAll({
        ...setQuery,
        attributes: { exclude: ['password'] },
        include: [
          {
            model: Department,
            as: 'Department',
            attributes: ['id', 'name', 'code', 'createdAt'],
          },
        ],
      }).then((selectedList) => {
        resolve(selectedList);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 상세정보 조회
  selectInfo(params) {
    return new Promise((resolve, reject) => {
      User.findByPk(params.id, {
        attributes: { exclude: ['password'] },
        include: [
          {
            model: Department,
            as: 'Department',
            attributes: ['id', 'name', 'code', 'createdAt'],
          },
        ],
      }).then((selectedInfo) => {
        resolve(selectedInfo);
      }).catch((err) => {
        reject(err);
      });
    });
  },
  // 로그인용 유저 정보 조회
  selectUser(params) {
    console.log('🚀 ~ selectUser ~ params:', params);
    return new Promise((resolve, reject) => {
      User.findOne({
        attributes: ['id', 'userid', 'password', 'name', 'role'],
        where: [{ userid: params.userid }],
      })
        .then((selectedInfo) => {
          resolve(selectedInfo);
        }).catch((err) => {
          reject(err);
        });
    });
  },
  // 수정
  update(params) {
    return new Promise((resolve, reject) => {
      User.update(
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
      User.destroy({
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
      User.destroy({
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

module.exports = userDao;
