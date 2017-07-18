var jwt = require('jsonwebtoken');
var userfile = './data/user.json';
let user = require('../data/user.json');

exports.login = function (req, res) {
   
    //Falscher Username oder falsches Passwort?
    if (req.body.username != userfile.username || req.body.password != userfile.password)
    {
        res.status(401).json
         (
            {
            message: 'Invalid Username or Password!'
            }
         );
       return;
    }


    //Wenn alles passt, Token generieren und schicken
    var token = jwt.sign(user, 'KatanasSignature', {
        expires: 86400
    });

    res.status(200).json({ 'token': token });


};

exports.changePassword = function (req, res) {


    //Eingeloggt?
    if (!res.locals.authenticated) {
        res.status(403).send();
        return;
    }

    //Richtiges Passwort?
    if (req.body.password != user.password) {
        res.status(401).json({
            message: 'Invalid Password!'
        });
        return;
    }

    //Passwort �ndern
    user.password = req.body.newPassword;


    //neuen Token ertsellen und senden
    var token = jwt.sign(user, 'KatanasSignature', {
        expires: 86400
    });

    res.status(200).json({ 'token': token });

};

exports.getpermission = function (req, res, next) {

};


