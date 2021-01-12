/*
 * Import Module
 ****************/
const express = require('express'),
    router = express.Router(),
    auth = require("../middleware/auth")

// Import Controller <-- Require
const homeController = require('./home/homeController')
const blogController = require('./home/blogController')
const articleController = require('./home/articleController')
const adminController = require('./home/adminController')
const userController = require('./home/userController')
const mailController = require('./home/mailController')

// MiddleWare
const redirectAuthSuccess = require('../middleware/redirectAuthSuccess')

// Routes Home
router.route('/')
    .get(homeController.get)

// Routes Blog
router.route('/blog')
    .get(blogController.get)

// Routes Article
router.route('/article/:id')
    .get(articleController.get)
router.route('/article/create')
    .post(articleController.post)

// Routes Admin
router.route('/admin')
    .get(auth, adminController.get)

// Routes User Create & Authentification & Déconnexion
router.route('/user/register')
    .post(userController.register)
router.route('/user/auth')
    .post(userController.auth)
router.route('/user/logout')
    .get(userController.logout)

// Routes mail
router.route('/mail')
    .post(mailController.post)

// Export
module.exports = router