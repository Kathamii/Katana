var jwt = require('jsonwebtoken');
var userfile = '../data/user.json';
let user = require('../data/user.json');
var fs = require('fs');

exports.login = function (req, res) {
   
    //Falscher Username oder falsches Passwort?
    if (req.body.username != user.username || req.body.password != user.password)
    {
        res.status(401).json
         (
            {
            message: 'Invalid Username or Password!' + req.body.username
            }
         );
       return;
    }
    else {

    //Wenn alles passt, Token generieren und schicken
    var token = jwt.sign(user, 'KatanasSignature', {
        //expires: 86400
    });

    res.status(200).json({ 'token': token });
    }
    
};

exports.changePassword = function (req, res) {



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

    });
    fs.writeFile('./data/user.json', JSON.stringify(user), 'utf-8', (err) => {})

    res.status(200).json({ 'token': token });

   

};




