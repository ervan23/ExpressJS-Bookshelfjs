const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);
const bookshelf = require('bookshelf')(knex);

const Token = bookshelf.Model.extend({
  tableName: 'tbl_token',
  hasTimestamps: true,
});

const model = {
  save(param) {
    return new Token(param).save();
  },
};

module.exports = model;
