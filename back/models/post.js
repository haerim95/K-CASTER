module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      charset: 'uft8mb4',
      collate: 'utf8mb4_general_ci',
    }
  );
  Post.associte = (db) => {};
  return Post;
};
