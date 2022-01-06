module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      src: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {
      charset: 'uft8',
      collate: 'utf8_general_ci',
    }
  );
  Image.associte = (db) => {};
  return Image;
};
