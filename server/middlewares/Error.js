const Error = {
    handleError(err, req, res, next) {
        if (err.status !== 404) {
            console.error(err.stack);
            res.status(err.status || 500).json({
                code: err.statusCode,
                message: err.message,
            });
        }
    },
};

export default Error;
