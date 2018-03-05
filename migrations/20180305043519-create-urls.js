module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('urls', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    longUrl: {
      type: Sequelize.STRING(2096),
      unique: true,
    },
    shortUrl: {
      type: Sequelize.STRING(6),
      unique: true,
    },
  }),
  down: queryInterface => queryInterface.dropTable('urls'),
};
