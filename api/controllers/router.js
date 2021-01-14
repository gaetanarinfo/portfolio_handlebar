/*
 * Import Module
 ****************/
const express = require('express'),
    router = express.Router(),
    auth = require("../middleware/auth"),
    authAdmin = require("../middleware/authAdmin")

// Import Controller <-- Require
const homeController = require('./home/homeController'),
    blogController = require('./home/blogController'),
    articleController = require('./home/articleController'),
    adminControllerUser = require('./home/adminControllerUser'),
    adminControllerArticle = require('./home/adminControllerArticle'),
    userController = require('./home/userController'),
    nodemailerController = require('./home/nodemailerController'),
    resetpasswordController = require('./home/resetpasswordController')

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
    .get(auth, authAdmin, adminControllerUser.showArticle)

// Routes Admin Section User
router.route('/admin/addUser')
    .post(auth, authAdmin, adminControllerUser.addUser)
router.route('/admin/editUser/:id')
    .post(auth, authAdmin, adminControllerUser.editUser)
router.route('/admin/view_membre/:id')
    .get(auth, authAdmin, adminControllerUser.viewUser)
router.route('/admin/delete_membre/:id')
    .get(auth, authAdmin, adminControllerUser.deletetUser)
router.route('/admin/confirm_delete_membre/:id')
    .get(auth, authAdmin, adminControllerUser.deleteUserConfirm)

// Routes Admin Section Blog (Articles)
router.route('/admin/articles')
    .get(auth, authAdmin, adminControllerArticle.showArticle)
router.route('/admin/addArticle')
    .post(auth, authAdmin, adminControllerArticle.addArticle)

// Routes User Create & Authentification & Déconnexion
router.route('/user/register')
    .post(nodemailerController.register)
router.route('/user/auth')
    .post(userController.auth)
router.route('/user/logout')
    .get(auth, userController.logout)
router.route('/user/forgot_password')
    .post(nodemailerController.forgot_password);

// Routes Password Reset
router.route('/reset-password/:token')
    .get(resetpasswordController.get)

router.route('/reset-password/:token')
    .post(resetpasswordController.post)

// Routes mail register
router.route('/mail')
    .post(nodemailerController.contact)

// Export
module.exports = router