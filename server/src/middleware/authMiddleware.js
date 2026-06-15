const authMiddleware =
(req, res, next) => {

    console.log(
        "Auth Middleware Executed"
    );

    next();
};

module.exports =
authMiddleware;