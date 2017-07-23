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
            message: 'Invalid Username or Password!  Username:' + req.body.username
            }
         );
       return;
    }
    else {
        var username = req.body.username
        var token = jwt.sign({user: username}, 'secretKey')
        res.json({
            message: 'Authenticated! Use this token in the "Authorization" header Username = ' + username ,
            token: token        
        });
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




