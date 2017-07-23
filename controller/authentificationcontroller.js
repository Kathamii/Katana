var jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {

    res.locals.authenticated = false;

    var token = req.headers['123Token123'];
    if (token) {

        try {
            var decodedJwt = jwt.verify(token, 'KatanasSignature');
            res.locals.authenticated = true;
            res.locals.token = decodedJwt;
        } catch (e) {

        }
    }
    next();
}