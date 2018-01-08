const passportJWT = require('passport-jwt');
const user = require('../model/User.js');

const extractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

module.exports = (passport) => {
  const jwtOptions = {};
  jwtOptions.jwtFromRequest = extractJwt.fromAuthHeaderWithScheme('jwt');
  jwtOptions.secretOrKey = process.env.JWT_SECRET;

  passport.use(new JwtStrategy(jwtOptions, ((jwtPayload, next) => {
    user.get({ id: jwtPayload.id }).then((result) => {
      if (result) {
        next(null, result);
      } else {
        next(null, false);
      }
    });
  })));
};

