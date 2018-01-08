const user = require('../model/User.js');
const jwt = require('jsonwebtoken');

const userController = {

  updateProfil(req, res, next) {
    const decodedToken = userController.getDecodedJwtToken(req);
    const response = {};
    user.update(decodedToken.id).then((result) => {
      const param = {
        name: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        updated_at: new Date(),
      };

      if (result.get('status') === 1) {
        result.save(param);
        response.error = false;
        response.message = 'Success to update data.';
        response.status = 200;
      } else {
        response.error = true;
        response.message = 'Your account is currently inactive.';
        response.status = 400;
      }
      next(response);
    })
      .catch((error) => {
        response.error = true;
        response.message = 'Error occured when updating data.';
        response.data = error;
        response.status = 500;
        next(response);
      });
  },
  getProfil(req, res, next) {
    const decodedToken = userController.getDecodedJwtToken(req);
    const response = {};
    user.get({ id: decodedToken.id }).then((result) => {
      if (result) {
        response.error = false;
        response.message = 'User Found.';
        response.data = result;
        response.status = 200;
        next(response);
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

  getDecodedJwtToken(req) {
    const token = req.headers.authorization.split(' ');
    return jwt.decode(token[token.length - 1]);
  },
};

module.exports = userController;

