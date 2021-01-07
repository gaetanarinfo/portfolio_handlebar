/*
 * Import Module
 ****************/
const express = require('express'),
    router = express.Router();

// Import Controller
const homeController = require('./home/homeController')
const blogController = require('./home/blogController')
const articleController = require('./home/articleController')
const adminController = require('./home/adminController')
const userController = require('./home/userController')
const userControllerAuth = require('./home/userControllerAuth')
const logoutController = require('./home/logoutController')

// Routes
router.route('/')
    .get(homeController.get)

// Routes Blog
router.route('/blog')
    .get(blogController.get)

// Routes Article
router.route('/article')
    .get(articleController.get)

// Routes Admin
router.route('/admin')
    .get(adminController.get)

// Routes User
router.route('/user/register')
    .post(userController.post)
router.route('/user/auth')
    .post(userControllerAuth.post)
router.route('/user/logout')
    .get(logoutController.get)

// Export
module.exports = router