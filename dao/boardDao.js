const { Op } = require('sequelize');
const { Board, User, Post } = require('../models/index');

const boardDao = {
  insert(params) {
    return new Promise((resolve, reject) => {
      Board.create(params).then((inserted) => {
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
    if (params.userIds) {
      setQuery.where = {
        ...setQuery.where,
        userId: params.userIds, // in 검색 ids ex) [1,2,3,4]
      };
    }
    if (params.title) {
      setQuery.where = {
        ...setQuery.where,
        title: { [Op.like]: `%${params.title}%` }, // like검색
      };
    }
    if (params.tags) {
      setQuery.where = {
        ...setQuery.where,
        tag: { [Op.contains]: params.tags }, // 'contains' 검색 tags = ['태그','태그2']
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
      Board.findAndCountAll({
        ...setQuery,
        include: [
          {
            model: User,
            as: 'User',
            attributes: User.getIncludeAttributes(),
          },
          // {
          //   model: Post,
          //   as: 'Posts',
          //   attributes: Post.getIncludeAttributes(),
          // },
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
      Board.findByPk(params.id, {
        include: [
          {
            model: User,
            as: 'User',
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
      Board.update(
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
      Board.destroy({
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
      Board.destroy({
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

module.exports = boardDao;
