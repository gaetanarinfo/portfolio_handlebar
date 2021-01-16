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
    adminControllerUser = require('./admin/ControllerUser'),
    adminControllerArticle = require('./admin/ControllerArticle'),
    adminControllerProjet = require('./admin/ControllerProjet'),
    adminControllerYoutube = require('./admin/ControllerYoutube'),
    adminControllerGalerie = require('./admin/ControllerGalerie'),
    userController = require('./user/userController'),
    nodemailerController = require('./user/nodemailerController'),
    resetpasswordController = require('./user/resetpasswordController')

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
router.route('/admin/editArticle/:id')
    .post(auth, authAdmin, adminControllerArticle.editArticle)
router.route('/admin/delete_article/:id')
    .get(auth, authAdmin, adminControllerArticle.deletetArticle)
router.route('/admin/confirm_delete_article/:id')
    .get(auth, authAdmin, adminControllerArticle.deleteArticleConfirm)

// Routes Admin Section Projet (Projets)
router.route('/admin/projets')
    .get(auth, authAdmin, adminControllerProjet.showProjet)
router.route('/admin/addProjet')
    .post(auth, authAdmin, adminControllerProjet.addProjet)
router.route('/admin/editProjet/:id')
    .post(auth, authAdmin, adminControllerProjet.editProjet)
router.route('/admin/delete_projet/:id')
    .get(auth, authAdmin, adminControllerProjet.deletetProjet)
router.route('/admin/confirm_delete_projet/:id')
    .get(auth, authAdmin, adminControllerProjet.deleteProjetConfirm)

// Routes Admin Section Youtube (Tutos)
router.route('/admin/youtubes')
    .get(auth, authAdmin, adminControllerYoutube.showTuto)
router.route('/admin/addTuto')
    .post(auth, authAdmin, adminControllerYoutube.addTuto)
router.route('/admin/editTuto/:id')
    .post(auth, authAdmin, adminControllerYoutube.editTuto)
router.route('/admin/delete_youtube/:id')
    .get(auth, authAdmin, adminControllerYoutube.deleteTuto)
router.route('/admin/confirm_delete_youtube/:id')
    .get(auth, authAdmin, adminControllerYoutube.deleteTutoConfirm)

// Routes Admin Section Galerie
router.route('/admin/galeries')
    .get(auth, authAdmin, adminControllerGalerie.showGalerie)
router.route('/admin/addGalerie')
    .post(auth, authAdmin, adminControllerGalerie.addGalerie)
router.route('/admin/editGalerie/:id')
    .post(auth, authAdmin, adminControllerGalerie.editGalerie)
router.route('/admin/delete_galerie/:id')
    .get(auth, authAdmin, adminControllerGalerie.deleteGalerie)
router.route('/admin/confirm_delete_galerie/:id')
    .get(auth, authAdmin, adminControllerGalerie.deleteGalerieConfirm)

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

// Routes user add like
router.route('/user/addLike/:id')
    .get(homeController.addLike)

// Export
module.exports = router