/*
 * Import Module
 ****************/
const express = require('express'), // Package express
    router = express.Router(), // Constante pour les routes
    auth = require("../middleware/auth"), // Midlewares auth users
    multer = require('multer'), // Multer Gestion d'image
    authAdmin = require("../middleware/authAdmin") // Middleware auth admin

// Swagger est un langage de description d'interface pour décrire les API RESTful exprimées à l'aide de JSON.
const swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../config/swagger.json')

// Import Controller
const homeController = require('./home/homeController'), // Controller home
    blogController = require('./home/blogController'), // Controller Blog
    articleController = require('./home/articleController'), // Controller Article Id
    // Controller Administration du site internet
    adminControllerUser = require('./admin/ControllerUser'),
    adminControllerArticle = require('./admin/ControllerArticle'),
    adminControllerProjet = require('./admin/ControllerProjet'),
    adminControllerYoutube = require('./admin/ControllerYoutube'),
    adminControllerGalerie = require('./admin/ControllerGalerie'),
    adminControllerComment = require('./admin/ControllerComment'),
    //
    // Controller user
    userController = require('./user/userController'),
    nodemailerController = require('./user/nodemailerController'),
    resetpasswordController = require('./user/resetpasswordController'),
    //
    // Controller flux rss
    rssController = require('./home/rssController'),
    //
    // Multer gestion image
    upload = require('../config/multer'),
    uploadGalerie = require('../config/multerGalerie'),
    uploadProjet = require('../config/multerProjet'),
    uploadUser = require('../config/multerUser'),
    tutoController = require('./home/tutoController'),
    tutoCatController = require('./home/tutoCatController')
    //

// Module express pour faire fonctionné l'aplication
const app = express()

// Routes Home
router.route('/')
    .get(homeController.get)

// Routes mail section contact ---> Home 
router.route('/mail')
    .post(nodemailerController.contact)

router.route('/recaptcha')
    .post(nodemailerController.captcha)

// Routes page Blog
router.route('/blog')
    .get(blogController.get)

// Routes page Article
router.route('/article/:id')
    .get(articleController.get)
router.route('/article/create/:id')
    .post(articleController.post)

// Routes page Admin
router.route('/admin')
    .get(auth, authAdmin, adminControllerUser.showUser)

// Routes Admin Section User
router.route('/admin/addUser')
    .post(auth, authAdmin, uploadUser.single('avatar'), adminControllerUser.addUser)
router.route('/admin/editMembre/:id')
    .post(auth, authAdmin, uploadUser.single('avatar'), adminControllerUser.editUser)
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
    .post(auth, authAdmin, upload.single('image'), adminControllerArticle.addArticle)
router.route('/admin/editArticle/:id')
    .post(auth, authAdmin, upload.single('image'), adminControllerArticle.editArticle)
router.route('/admin/delete_article/:id')
    .get(auth, authAdmin, adminControllerArticle.deletetArticle)
router.route('/admin/confirm_delete_article/:id')
    .get(auth, authAdmin, adminControllerArticle.deleteArticleConfirm)

// Routes Admin Section Projet
router.route('/admin/projets')
    .get(auth, authAdmin, adminControllerProjet.showProjet)
router.route('/admin/addProjet')
    .post(auth, authAdmin, uploadProjet.single('image'), adminControllerProjet.addProjet)
router.route('/admin/editProjet/:id')
    .post(auth, authAdmin, uploadProjet.single('image'), adminControllerProjet.editProjet)
router.route('/admin/delete_projet/:id')
    .get(auth, authAdmin, adminControllerProjet.deletetProjet)
router.route('/admin/confirm_delete_projet/:id')
    .get(auth, authAdmin, adminControllerProjet.deleteProjetConfirm)

// Routes Admin Section Tutoriel
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
    .post(auth, authAdmin, uploadGalerie.single('image'), adminControllerGalerie.addGalerie)
router.route('/admin/editGalerie/:id')
    .post(auth, authAdmin, uploadGalerie.single('image'), adminControllerGalerie.editGalerie)
router.route('/admin/delete_galerie/:id')
    .get(auth, authAdmin, adminControllerGalerie.deleteGalerie)
router.route('/admin/confirm_delete_galerie/:id')
    .get(auth, authAdmin, adminControllerGalerie.deleteGalerieConfirm)

// Routes Admin Section Commentaire
router.route('/admin/comments')
    .get(auth, authAdmin, adminControllerComment.showComment)
router.route('/admin/editComment/:id')
    .post(auth, authAdmin, adminControllerComment.editComment)
router.route('/admin/delete_comment/:id')
    .get(auth, authAdmin, adminControllerComment.deleteComment)
router.route('/admin/confirm_delete_comment/:id')
    .get(auth, authAdmin, adminControllerComment.deleteCommentConfirm)

// Routes User Create & Auth & Logout
router.route('/user/register')
    .post(uploadUser.single('avatar'), nodemailerController.register)
router.route('/user/auth')
    .post(userController.auth)
router.route('/user/logout')
    .get(auth, userController.logout)
router.route('/user/forgot_password')
    .post(nodemailerController.forgot_password);
router.route('/user/edit')
    .post(userController.editUser)
router.route('/user/delete')
    .get(userController.deleteUser)

// Routes reset password
router.route('/reset-password/:token')
    .get(resetpasswordController.get)
router.route('/reset-password/:token')
    .post(resetpasswordController.post)

// Routes user add like projet
router.route('/user/addLike/:id')
    .get(homeController.addLike)
router.route('/user/removeLike/:id')
    .get(homeController.removeLike)

// Routes flux rss
router.route('/feed')
    .get(rssController.getRss)

// Routes Tutoriel
router.route('/tutoriel')
    .get(tutoController.getTuto)
router.route('/tutorielCat/:category')
    .get(tutoCatController.getCat)

// Route Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/*
 * Export Module
 ****************/
module.exports = router