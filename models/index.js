const { sequelize } = require('./connection');
const Department = require('./department');
const User = require('./user');
const Board = require('./board');
const Post = require('./post');
const Comment = require('./comment');
const PostUserHateJoin = require('./postUserHateJoin');
const PostUserLikeJoin = require('./postUserLikeJoin');
const CommentUserHateJoin = require('./commentUserHateJoin');
const CommentUserLikeJoin = require('./commentUserLikeJoin');

const db = {};

db.sequelize = sequelize;

db.Department = Department;
db.User = User;
db.Board = Board;
db.Post = Post;
db.Comment = Comment;
db.PostUserHateJoin = PostUserHateJoin;
db.PostUserLikeJoin = PostUserLikeJoin;
db.CommentUserHateJoin = CommentUserHateJoin;
db.CommentUserLikeJoin = CommentUserLikeJoin;

// Department.init(sequelize);
// User.init(sequelize);
Object.keys(db).forEach((modelName) => {
  if (db[modelName].init) {
    db[modelName].init(sequelize);
  }
});
// 관계 설정
// Department.associate(db);
// User.associate(db);

setTimeout(() => {
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
}, 3000);

module.exports = db;
