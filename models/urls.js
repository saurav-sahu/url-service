module.exports = (sequelize, DataTypes) => {
  const urls = sequelize.define('urls', {
    longUrl: {
      type: DataTypes.STRING(2096),
      unique: true,
    },
    shortUrl: {
      type: DataTypes.STRING(6),
      unique: true,
    },
  }, {
    timestamps: false,
  });
  return urls;
};
