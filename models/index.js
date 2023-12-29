const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
// user has many posts, post has many comments, comment belongs to user
// if user is deleted then the associated post will be deleted, in addition to the associated post to be deleted any comments associated with the post will also be deleted, when you delete a user then the associated comments of that user will alos be deleted
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Post, Comment };
