module.exports = {
  up: queryInterface => queryInterface.removeConstraint('urls', 'urls_longUrl_key'),

  down: queryInterface => queryInterface.addConstraint('urls', ['longUrl'], {
    type: 'unique',
    name: 'urls_longUrl_key',
  }),
};
