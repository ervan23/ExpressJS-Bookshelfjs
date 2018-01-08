const user = require('../model/User.js');
const bcrypt = require('bcrypt');

const userController = {
  insertUser(req, res, next) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(req.body.password, salt, (errHash, hash) => {
        const response = {};
        const param = {
          name: req.body.username,
          password: hash,
          email: req.body.email,
          phone: req.body.phone,
          gender: req.body.gender,
          created_at: new Date(),
          updated_at: new Date(),
        };
        user.save(param);
        response.error = false;
        response.message = 'Success to store data.';
        response.status = 200;
        next(response);
      });
    });
  },

  updateUser(req, res, next) {
    const response = {};
    user.update(req.body.id).then((result) => {
      const param = {
        name: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        updated_at: new Date(),
      };

      if (result) {
        result.save(param);
        response.error = false;
        response.message = 'Success to update user.';
        response.data = result;
        response.status = 200;
      } else {
        response.error = true;
        response.message = 'No such user found.';
        response.data = result;
        response.status = 400;
      }
      next(response);
    })
      .catch((error) => {
        response.error = true;
        response.message = 'No such user found.';
        response.data = error;
        response.status = 500;
        next(response);
      });
  },

  deleteUser(req, res, next) {
    const response = {};
    user.delete(req.params.id).then((result) => {
      result.destroy();
      response.error = false;
      response.message = 'Success to delete data.';
      response.status = 200;
      next(response);
    })
      .catch(() => {
        response.error = true;
        response.message = 'Error occured when deleting data.';
        response.status = 500;
        next(response);
      });
  },
  getUser(req, res, next) {
    const response = {};
    user.get({ id: req.params.id }).then((result) => {
      if (result) {
        response.error = false;
        response.message = 'User Found.';
        response.data = result;
        res.status(200).json(response);
      } else {
        response.error = false;
        response.message = 'User not Found.';
        response.data = result;
        response.status = 200;
        next(response);
      }
    })
      .catch(() => {
        response.error = true;
        response.message = 'Error occured when getting data.';
        response.data = null;
        response.status = 500;
        next(response);
      });
  },
  getAllUser(req, res, next) {
    const response = {};
    user.get().then((result) => {
      response.error = false;
      response.message = 'All User Found.';
      response.data = result;
      response.status = 200;
      next(response);
    })
      .catch(() => {
        response.error = true;
        response.message = 'Error occured when getting data.';
        response.data = null;
        response.status = 500;
        next(response);
      });
  },

  changeUserStatus(req, res, next) {
    const response = {};
    user.update(req.body.id).then((result) => {
      const param = {
        status: req.body.status,
        updated_at: new Date(),
      };

      if (result) {
        result.save(param);
        response.error = false;
        response.message = 'Success to change user status.';
        response.status = 200;
      } else {
        response.error = true;
        response.message = 'No such user found.';
        response.status = 400;
      }
      next(response);
    })
      .catch((error) => {
        response.error = true;
        response.message = 'No such user found.';
        response.data = error;
        response.status = 500;
        next(response);
      });
  },
};

module.exports = userController;

