const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_controller')

console.log("Router Loaded")

router.get('/',homeController.home)
router.use('/users',require('./user'));

// for posts
router.use('/posts',require('./posts'));

//for comments
router.use('/comments',require('./comments'));

module.exports=router;