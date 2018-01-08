module.exports = {
  responseHandler: (output, req, res, next) => {
    if (output.status === 200) {
      res.status(200).json(output);
    } else {
      next(output);
    }
  },
  errorHandler: (err, req, res, next) => {
    res.status(err.status === undefined ? 500 : err.status).json(err);
    next();
  },
};
