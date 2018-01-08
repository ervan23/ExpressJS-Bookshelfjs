const express = require('express');
const bodyParser = require('body-parser');
const validator = require('express-validator');

const serviceHandler = require('./middleware/serviceHandler.js');
const userRouter = require('./router/UserRouter.js');
const authRouter = require('./router/AuthRouter.js');
const profilRouter = require('./router/ProfilRouter.js');
const passport = require('passport');

const app = express();

app.use(validator());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
require('./helper/passportHelper.js')(passport);

app.use('/api/user', userRouter);
app.use('/auth', authRouter);
app.use('/api/profile', profilRouter);

app.use(serviceHandler.responseHandler);
app.use(serviceHandler.errorHandler);

app.listen(1994);
