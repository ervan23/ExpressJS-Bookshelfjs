const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../model/User.js');
const token = require('../model/Token.js');
const postmark = require('postmark');
const crypto = require('crypto-js');
const moment = require('moment');

const postmarkClient = new postmark.Client(process.env.POSTMARK_KEY);

const authController = {

  register(req, res, next) {
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
        response.message = 'Success to register.';
        response.status = 200;
        next(response);
      });
    });
  },

  login(req, res, next) {
    const response = {};
    user.login({ email: req.body.email }).then((result) => {
      bcrypt.compare(req.body.password, result.get('password'), (err, correct) => {
        if (correct) {
          const jwtToken = jwt.sign({ id: result.get('id'), role: result.get('role') }, process.env.JWT_SECRET, {
            expiresIn: '1d',
          });
          response.error = false;
          response.message = 'Logged In';
          response.token = jwtToken;
          response.status = 200;
        } else {
          response.error = true;
          response.message = 'Login failed';
          response.token = null;
          response.status = 400;
        }
        next(response);
      });
    }).catch(() => {
      response.error = true;
      response.message = 'Error occured.';
      response.token = null;
      response.status = 500;
      next(response);
    });
  },

  forgotPassword(req, res, next) {
    const response = {};
    user.get({ email: req.body.email }).then((result) => {
      if (result) {
        const encrypt = {
          email: req.body.email,
          expired: moment().add(2, 'hours').format(),
        };
        const genToken = crypto.AES.encrypt(JSON.stringify(encrypt), process.env.CRYPTO_SECRET_KEY);
        token.save({ token: genToken.toString(), expired: encrypt.expired });

        postmarkClient.sendEmail({
          From: process.env.CONFIG_EMAIL,
          To: req.body.email,
          Subject: 'Reset Password',
          HtmlBody: `<p>Use this link to reset your password</p><br>
            <a href="http://localhost:1994/auth/reset_password?token=${genToken.toString()}">Reset Password</a>`,
        });

        response.error = false;
        response.message = 'We sent reset password link to your email.';
        response.status = 200;
      } else {
        response.error = true;
        response.message = 'Email address that you entered is not registered.';
        response.status = 400;
      }
      next(response);
    })
      .catch((err) => {
        response.error = false;
        response.message = `Error occured when sending email. ${err}`;
        response.status = 500;
        next(response);
      });
  },

  resetPassword(req, res, next) {
    const response = {};
    const decrypt = crypto.AES.decrypt(req.body.token.split(' ').join('+'), process.env.CRYPTO_SECRET_KEY);
    const parsedToken = JSON.parse(decrypt.toString(crypto.enc.Utf8));

    const m = moment.utc(moment(), 'YYYY-MM-DD  HH:mm:ss');
    if (m.isBefore(new Date(parsedToken.expired))) {
      user.get({ email: parsedToken.email }).then((result) => {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (errHash, hash) => {
            const param = {
              password: hash,
              updated_at: new Date(),
            };

            result.save(param);
            response.error = false;
            response.message = 'Success to reset password.';
            response.status = 200;
            next(response);
          });
        });
      });
    } else {
      response.error = true;
      response.message = 'Your token has been expired.';
      response.status = 401;
      next(response);
    }
  },

};

module.exports = authController;
