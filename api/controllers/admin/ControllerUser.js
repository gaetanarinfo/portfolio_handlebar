/*
 * Import Module
 ****************/
const User = require('../../database/models/users'),
    path = require('path'),
    fs = require('fs'),
    paginator = require('../../controllers/home/pagination/paginator')

/*
 * Controller
 *************/
module.exports = {

    // Method Get pour recevoir les datas dans la page users
    showUser: async(req, res) => {

        const success = req.session.success, // Message Succes
            error = req.session.error // Message Error

        req.session.success = undefined
        req.session.error = undefined

        const email = req.session.email

        // Nombre d'item par page
        var perPage = 10

        // La page que l'on veux récupéré si il y a en pas alors page 1
        var page = req.query.page || 1
        var arrayPagesIndexes = []

        // Ici on recherche nos membres
        User.find()
            // Ici On viens chercher l'index qui nous interesse
            // exemple: pour la page 2 avec 5 perPage = index 5
            // donc (5 * 2) - 5 = 5
            .skip((perPage * page) - perPage)
            // Ici on limite le nombre de résultat
            .limit(perPage)
            .lean()
            .exec((err, membres) => {
                if (err) console.log(err)
                    // Ici on compte le nombre d'article total 
                User.countDocuments()
                    .exec((err, count) => {
                        if (err) return next(err)
                            // Ici on calcul le nombre de pages
                        var allPagesNumber = Math.ceil(count / perPage)
                            // On fait une boucle sur le nombre total de page
                        for (i = 0; i < allPagesNumber; i++) {
                            // On push nos index dans le tableau
                            arrayPagesIndexes.push(i + 1)
                        }

                        // Function de pagination de page
                        const prelinks = "/admin",
                            paginationUser = paginator(page, perPage, count, prelinks) // Function paginator

                        if (success || error) {
                            res.render('admin', {
                                // Page sur la quel on est : Number
                                current: page,
                                // Nombre de pages : Number
                                pages: Math.ceil(count / perPage),
                                // tableau avec les index des page: []
                                arrayPage: arrayPagesIndexes,
                                // Les membres : [{}]
                                membres: membres,
                                // Pages - 1
                                previous: parseInt(page) - 1,
                                // Pages + 1
                                next: parseInt(page) + 1,
                                paginationUser,

                                success: success,
                                error: error,
                                layout: 'admin',
                                title: 'Administration de mon blog',
                                content: "Partie administration de mon portfolio",
                            })
                        } else {
                            res.render('admin', {
                                // Page sur la quel on est : Number
                                current: page,
                                // Nombre de pages : Number
                                pages: Math.ceil(count / perPage),
                                // tableau avec les index des page: []
                                arrayPage: arrayPagesIndexes,
                                // Les membres : [{}]
                                membres: membres,
                                // Pages - 1
                                previous: parseInt(page) - 1,
                                // Pages + 1
                                next: parseInt(page) + 1,
                                paginationUser,

                                error: error,
                                layout: 'admin',
                                title: 'Administration de mon blog',
                                content: "Partie administration de mon portfolio",
                            })
                        }

                    })
            })
    },

    // Method Post pour envoyer les datas users pour ajouter un utilisateur
    addUser: (req, res) => {

        if (req.body.password.length > 9) {

            User
                .create({
                    image: `/images/avatar/${image}`,
                    name: image,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: avatarFile.name
                }, (err) => {
                    if (err) {
                        //console.log(err)
                        req.flash('error', 'Une erreur est survenue !')
                        req.session.error = req.flash('error')

                        res.redirect('/admin')
                    } else {
                        req.flash('success', 'Membres inscrits !')
                        req.session.success = req.flash('success')

                        res.redirect('/admin')
                    }

                })

        } else {
            req.flash('error', 'Le mot de passe doit contenir minimums 8 caractères !')
            req.session.error = req.flash('error')
            res.redirect('/admin')
        }

    },

    // Method Post pour envoyer les datas users pour édition
    editUser: async(req, res) => {

        // On declare notre userID (Objet à éditer)
        const userID = await User.findById(req.params.id),
            // Query qui est l'id de notre objet à éditer
            query = { _id: req.params.id },
            // pathImg sera le chemin de notre fichier à supprimer
            pathImg = path.resolve("./public/images/avatar/" + userID.name)

        // Condition pour verifier qu'il n'y a pas de fichier dans notre formulaire
        if (!req.file) {

            User.updateOne(query, {
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                email: req.body.email,
                isAdmin: Boolean(req.body.isAdmin),
                isBanned: Boolean(req.body.isBanned)
                    // et notre callback d'error
            }, (err) => {
                if (err) {
                    res.redirect('/admin')
                } else {
                    req.flash('success', 'Le membre ' + req.body.lastname + ' ' + req.body.firstname + ' à été modifié !')
                    req.session.success = req.flash('success')

                    res.redirect('/admin')
                }
            })


            // Sinon (Donc si nous avont un fichier (image) dans notre formulaire)
        } else {
            // Ici nous éditons notre article selectionner grâce à query
            User.updateOne(query, {
                // on récupère tout notre req.body
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                email: req.body.email,
                isBanned: Boolean(req.body.isBanned),
                isAdmin: Boolean(req.body.isAdmin),
                // ici on viens stocker le chemin de l'image dans la DB
                avatar: `./public/images/avatar/${req.file.originalname}`,
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

                    // Renvoie un message de success
                    req.flash('success', 'Le membre ' + req.body.lastname + ' ' + req.body.firstname + ' à été modifié !')
                    req.session.success = req.flash('success')

                    res.redirect('/admin')

                }

            })
        }

    },

    // Method get pour voir l'utilisateur dans le modal
    viewUser: (req, res) => {

        const id = req.params.id

        User.findById({ _id: id }, (erro, user) => {

            res.render('admin')

        })

    },

    // Method del pour voir l'utilisateur à supprimer dans le modal
    deletetUser: (req, res) => {

        const id = req.params.id

        User.findById({ _id: id }, (erro, user) => {

            res.render('admin')

        })

    },

    // Method del pour comfirmer la suppression de l'utilisateur dans le modal
    deleteUserConfirm: async(req, res) => {

        // Ici on déclare la récupération de notre projetID grace à notre recherche asynchrone filtrer avec notre req.params.id
        const dbUser = await User.findById(req.params.id),
            // Ici on déclare le chemin de l'image qui devra etre supprimer
            pathImg = path.resolve("./public/images/avatar/" + dbUser.name)

        // User nous avons une fonction de suppression de notre article filtrer grace à req.params.id (objet dans la DB)
        Projet.deleteOne({ _id: req.params.id }, (err) => {
            // Ici notre callback verifie bien que notre fonction c'est passer sans erreur
            if (err) console.log(err)
                // Et si nous n'avons aucune erreur alors on execute ça
            else {
                // Ici est notre fonction de suppression du fichier (image) avec son callback
                fs.unlink(pathImg, (err) => {
                    if (err) {
                        //console.log(err)
                        req.flash('error', 'Une erreur est survenue !')
                        req.session.error = req.flash('error')
                    } else {
                        req.flash('success', 'Le membre à été supprimé !')
                        req.session.success = req.flash('success')

                        res.redirect('/admin')
                    }
                })
            }
        })

    }
}