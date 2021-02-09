/*
 * Import Module
 ****************/
const User = require('../../database/models/users'),
    bcrypt = require('bcrypt'),
    extIP = require("ext-ip")(),
    path = require('path')

/*
 * Controller
 *************/
module.exports = {

    // Method auth pour la connexion
    auth: (req, res) => {

        const { email, password } = req.body;

        // On recherche l'utilisateur
        User.findOne({ email }, (error, user) => {
            if (user) {

                // On décrypte le mot de passe et on le compare avec l'utilisateur
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {

                        // Récupère les informations du membre et les stock dans la session
                        req.session.userId = user._id
                        req.session.lastname = user.lastname
                        req.session.firstname = user.firstname
                        req.session.email = user.email
                        req.session.avatar = user.avatar
                        req.session.isAdmin = user.isAdmin
                        req.session.isLog = user.isLog
                        req.session.ip = user.ip

                        // On récupere l'ip de l'utilisateur pour la stocker
                        extIP.get((err, ip) => {
                            if (err) {
                                //console.error("callback error: " + err);
                            } else {

                                // On met à jour l'ip dans la BDD
                                User.findOneAndUpdate({ '_id': user.id }, {
                                    isLog: new Date(),
                                    ip: ip
                                }, (error) => {});

                            }
                        })

                        // Message en cas de success
                        req.flash('success', 'Connexion réussie !')
                        req.session.success = req.flash('success')

                        res.redirect('/')

                    } else {

                        // Message en cas d'erreur
                        req.flash('error', 'Une erreur est survenue !')
                        req.session.error = req.flash('error')
                        res.redirect('/')
                    }
                })

            } else {

                // Message en cas d'erreur
                req.flash('error', "Erreur l'email ou le mot de passe n'est pas correct !")
                req.session.error = req.flash('error')
                res.redirect('/')
            }
        })
    },

    // Method logout pour la déconnexion
    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/')
    },

    // Method post pour editer son profil
    editUser: async(req, res) => {

        // On declare notre userID (Objet à éditer)
        const userID = await User.findById(req.params.id),
            // Query qui est l'id de notre objet à éditer
            query = { _id: req.params.id },
            // pathImg sera le chemin de notre fichier à supprimer
            pathImg = path.resolve("./public/images/avatar/" + userID.name)

        // Condition pour verifier qu'il n'y a pas de fichier dans notre formulaire
        if (!req.file) {


            // Ici nous éditons le titre de notre Article selectionner grace à query
            Article.updateOne(query, {
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                email: req.body.email,
                // et notre callback d'error
            }, (err) => {
                if (err) {
                    res.redirect('/admin/articles')
                } else {
                    req.flash('success', "Votre profil à été mis à jour !")
                    req.session.success = req.flash('success')
                    res.redirect('/')
                }
            })

            // Sinon (Donc si nous avont un fichier (image) dans notre formulaire)
        } else {
            // Ici nous éditons notre article selectionner grâce à query
            Article.updateOne(query, {
                // on récupère tout notre req.body
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                email: req.body.email,
                // ici on viens stocker le chemin de l'image dans la DB
                image: `/images/avatar/${req.file.originalname}`,
                // Ici on stock le nom de l'image dans notre DB
                name: req.file.originalname
                    // Notre callback d'error
            }, (err) => {
                if (err) {

                    //console.log(err)
                    req.flash('error', 'Une erreur est survenue !')
                    req.session.error = req.flash('error')

                } else {

                    // Si notre callback nous donne pas d'erreur alors note fonction de suppression de l'image de lance avec un callback d'err
                    fs.unlink(pathImg, (err) => {
                        if (err) console.log(err)

                    })

                    req.flash('success', "Votre profil à été mis à jour !")
                    req.session.success = req.flash('success')
                    res.redirect('/')

                }

            })
        }

    },
}