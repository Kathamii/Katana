var express = require('express');
var router = express.Router();

var usercontroller = require('../controller/usercontroller');

router.put('/login', usercontroller.login);
router.put('/passwordRecovery', usercontroller.changePassword);

module.exports = router;