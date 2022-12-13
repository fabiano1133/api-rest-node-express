const NotFound = {
  notFound(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  },
};

export default NotFound;
