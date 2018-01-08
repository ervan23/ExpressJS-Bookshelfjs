module.exports = {
  insertValidator: (req, res, next) => {
    req.checkBody('username', 'Username is required.').isLength({ min: 1 });
    req.checkBody('password', 'Password is required.').isLength({ min: 1 });
    req.checkBody('email', 'Enter valid email.').isLength({ min: 1 }).isEmail();
    req.checkBody('phone', 'Phone is required.').isLength({ min: 1 });
    req.checkBody('gender', 'Gender is required.').isLength({ min: 1 });
    const error = req.validationErrors();
    const response = {};

    if (error) {
      response.error = true;
      response.message = 'All required fild must be not empty value';
      response.data = error;
      response.status = 400;
      next(response);
    } else {
      next();
    }
  },

  updateValidator: (req, res, next) => {
    req.checkBody('username', 'Username is required.').isLength({ min: 1 });
    req.checkBody('id', 'ID user is required.').isLength({ min: 1 });
    req.checkBody('email', 'Enter valid email.').isLength({ min: 1 }).isEmail();
    req.checkBody('phone', 'Phone is required.').isLength({ min: 1 });
    req.checkBody('gender', 'Gender is required.').isLength({ min: 1 });
    const error = req.validationErrors();
    const response = {};

    if (error) {
      response.error = true;
      response.message = 'All required fild must be not empty value';
      response.data = error;
      response.status = 400;
      next(response);
    } else {
      next();
    }
  },

  updateProfileValidator: (req, res, next) => {
    req.checkBody('username', 'Username is required.').isLength({ min: 1 });
    req.checkBody('email', 'Enter valid email.').isLength({ min: 1 }).isEmail();
    req.checkBody('phone', 'Phone is required.').isLength({ min: 1 });
    req.checkBody('gender', 'Gender is required.').isLength({ min: 1 });
    const error = req.validationErrors();
    const response = {};

    if (error) {
      response.error = true;
      response.message = 'All required fild must be not empty value';
      response.data = error;
      response.status = 400;
      next(response);
    } else {
      next();
    }
  },
};
