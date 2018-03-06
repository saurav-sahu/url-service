module.exports = (sequelize, DataTypes) => {
  const urls = sequelize.define('urls', {
    longUrl: {
      type: DataTypes.STRING(2096),
    },
    shortUrl: {
      type: DataTypes.STRING(6),
      unique: true,
      validate: {
        len: [6, 6],
      },
    },
  });
  urls.newUrl = (shortUrl, longUrl) => urls.findOrCreate({
    where: { shortUrl },
    defaults: { longUrl },
  });
  return urls;
};
