const LogRequest = {
  logRequest(req, res, next) {
    console.log(
      `${req.url} - ${req.method} - ${res.statusCode} - ${new Date()}`
    );
    next();
  },
};

export default LogRequest;
