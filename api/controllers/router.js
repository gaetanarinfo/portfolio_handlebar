/*
 * Import Module
 ****************/
const express = require('express'),
    router = express.Router(),
    auth = require("../middleware/auth")

// Import Controller <-- Require
const homeController = require('./home/homeController'),
    blogController = require('./home/blogController'),
    articleController = require('./home/articleController'),
    adminController = require('./home/adminController'),
    userController = require('./home/userController'),
    nodemailerController = require('./home/nodemailerController')

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
    .post(nodemailerController.register)
router.route('/user/auth')
    .post(userController.auth)
router.route('/user/logout')
    .get(userController.logout)
router.route('/user/forgot_password')
    //.get(nodemailerController.render_forgot_password_template)
    .post(nodemailerController.forgot_password);


// Routes mail register
router.route('/mail')
    .post(nodemailerController.contact)

// Export
module.exports = router