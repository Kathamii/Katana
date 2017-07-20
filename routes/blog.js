var express = require('express');
var router = express.Router();

var blogcontroller = require('../controller/blogcontroller.js');
var usercontroller = require('../controller/usercontroller.js');

router.get('/', blogcontroller.getblogentrys);
router.post('/',  blogcontroller.postentry);
router.get('/:id?',  blogcontroller.getblogentrybyid);
router.delete('/:id?',  blogcontroller.deleteblogentrybyid);
router.put('/:id?', blogcontroller.updateblogentrybyid);

module.exports = router;