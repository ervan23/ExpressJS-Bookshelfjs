
const auth = {
  passport: null,
  setPassport: (passport) => {
    auth.passport = passport;
  },

  authenticate: (allowed) => {
    const response = {};
    return (req, res, next) => {
      if (typeof allowed !== 'object') {
        response.message = `Authenticated paramater should as array/object type, but ${typeof allowed} given.`;
        response.error = true;
        response.status = 500;
        next(response);
      }

      auth.passport.authenticate('jwt', { session: false }, (err, user) => {
        if (!user) {
          response.message = 'Unauthorized';
          response.error = true;
          response.status = 401;
          next(response);
        } else if (allowed.indexOf(user.get('role')) < 0) {
          response.message = 'Your account have no permission to access this service';
          response.error = true;
          response.status = 401;
          next(response);
        }

        next();
      })(req, res, next);
    };
  },
};

module.exports = auth;
