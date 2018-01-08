const knexfile = require('../knexfile');
const knex = require('knex')(knexfile.development);
const bookshelf = require('bookshelf')(knex);

bookshelf.plugin('visibility');

const User = bookshelf.Model.extend({
  tableName: 'tbl_user',
});

const model = {
  save(param) {
    return new User(param).save();
  },

  update(idUser) {
    return User.forge({ id: idUser }).fetch();
  },

  delete(idUser) {
    return User.forge({ id: idUser }).fetch();
  },

  get(clause) {
    let query;
    if (clause === undefined) {
      query = new User().fetchAll({
        columns: ['id', 'name', 'email', 'phone', 'gender', 'role', 'status', 'created_at', 'updated_at'],
      });
    } else {
      query = User.where(clause).fetch({
        columns: ['id', 'name', 'email', 'phone', 'gender', 'role', 'status', 'created_at', 'updated_at'],
      });
    }

    return query;
  },

  login(clause) {
    return User.where(clause).fetch();
  },

};

module.exports = model;
