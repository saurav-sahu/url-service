module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('urls', 'createdAt', {
      allowNull: false,
      type: Sequelize.DATE,
    })
      .then(() => queryInterface.addColumn('urls', 'updatedAt', {
        allowNull: false,
        type: Sequelize.DATE,
      })),

  down: queryInterface =>
    queryInterface.removeColumn('urls', 'createdAt')
      .then(() => queryInterface.removeColumn('urls', 'updatedAt')),
};
