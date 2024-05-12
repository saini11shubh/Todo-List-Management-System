exports.catchErrors = (action) => (req, res, next) => action(req, res, next).catch(next);

exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        message: "Internal Server Error"
    });
};

