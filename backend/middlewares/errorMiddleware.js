const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(400);
    next(error);
};

const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    let message = err.message;

    //If mongoose not found error
    if (err.name == 'cast error' && err.kind == 'objectID') {
        statusCode = 404;
        message = 'Resource not Found';
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV == 'production' ? null : err.stack,
    });

};

export { notFound, errorHandler };