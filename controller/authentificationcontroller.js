var jwt = require('jsonwebtoken');
var usercontroller = require('../controller/usercontroller.js');

module.exports = function (req, res, next) {

    res.locals.authenticated = false;
    const Auth = req.headers["authorization"]
    console.log(Auth);

    if(Auth)    {
        try{
            var decod = jwt.verify(Auth, 'secretKey')
            res.locals.authenticated = true
        }catch (e) {
        
            console.log('Auth Failed')
        }

    }

    next();
}