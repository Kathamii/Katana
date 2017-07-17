var express = require('express');
var router = express.Router();

var blogcontroller = require('../controller/blogcontroller.js');
var usercontroller = require('../controller/usercontroller.js');

router.get('/', usercontroller.getpermission, blogcontroller.getblogentrys);
router.post('/', usercontroller.getpermission, blogcontroller.postentry);
router.get('/:id?', usercontroller.getpermission, blogcontroller.getblogentrybyid);
router.delete('/:id?', usercontroller.getpermission, blogcontroller.deleteblogentrybyid);
router.put('/:id?', usercontroller.getpermission, blogcontroller.updateblogentrybyid);

module.exports = router;