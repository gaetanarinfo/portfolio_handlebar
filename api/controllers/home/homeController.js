/*
 * Import Module
 ****************/
const Projet = require('../../database/models/projets'),
    Tuto = require('../../database/models/tutos'),
    Article = require('../../database/models/articles'),
    Galerie = require('../../database/models/galeries'),
    Comment = require('../../database/models/comments'),
    renderHome = require('./render/renderHome')

/*
 * Controller
 *************/
module.exports = {
    get: async(req, res) => {

        const tutos = await Tuto.find({}).lean(), // Cards Tutoriels
            articles = await Article.find({}).sort('-dateCreate').lean(), // Cards Articles
            galeries = await Galerie.find({}).lean(), // Cards Galerie
            commentCount = await Comment.countDocuments(), // Compter le nombre de commantaire
            commentsAll = await Comment.find({}).sort('-dateCreate').lean(), // Affiche les commentaires dansd le footer
            success = req.session.success, // Message Succes
            error = req.session.error // Message Error

        req.session.success = undefined // Définie le cookie de message success
        req.session.error = undefined // Définie le cookie de message error

        // Nombre d'item par page
        var perPage = 5
            // La page que l'on veux récupéré si il y a en pas alors page 1
        var page = req.query.page || 1
        var arrayPagesIndexes = []

        // Ici on recherche nos projets
        Projet.find()
            // Ici On viens chercher l'index qui nous interesse
            // exemple: pour la page 2 avec 5 perPage = index 5
            // donc (5 * 2) - 5 = 5
            .skip((perPage * page) - perPage)
            // Ici on limite le nombre de résultat
            .limit(perPage)
            .lean()
            .exec((err, projets) => {
                if (err) console.log(err)
                    // Ici on compte le nombre d'article total 
                Projet.countDocuments()
                    .exec((err, count) => {
                        if (err) return next(err)
                            // Ici on calcul le nombre de pages
                        var allPagesNumber = Math.ceil(count / perPage)
                            // On fait une boucle sur le nombre total de page
                        for (i = 0; i < allPagesNumber; i++) {
                            // On push nos index dans le tableau
                            arrayPagesIndexes.push(i + 1)
                        }

                        Projet.find()
                            // Ici On viens chercher l'index qui nous interesse
                            // exemple: pour la page 2 avec 5 perPage = index 5
                            // donc (5 * 2) - 5 = 5
                            .skip((perPage * page) - perPage)
                            // Ici on limite le nombre de résultat
                            .limit(perPage)
                            .lean()
                            .exec((err, projets) => {
                                if (err) console.log(err)
                                    // Ici on compte le nombre d'article total 
                                Projet.countDocuments()
                                    .exec((err, count) => {
                                        if (err) return next(err)
                                            // Ici on calcul le nombre de pages
                                        var allPagesNumber = Math.ceil(count / perPage)
                                            // On fait une boucle sur le nombre total de page
                                        for (i = 0; i < allPagesNumber; i++) {
                                            // On push nos index dans le tableau
                                            arrayPagesIndexes.push(i + 1)
                                        }

                                        // Module pour le render Home
                                        renderHome(req, res, success, error, page, count, perPage, projets, arrayPagesIndexes, tutos, articles, galeries, commentsAll, commentCount)

                                    })
                            })

                    })
            })


    },

    addLike: async(req, res) => {


        const query = req.params.id,
            iduser = req.session.userId,
            projet = await Projet.findById(query),
            like = projet.like

        if (like != iduser) {

            like.push(iduser)

            Projet.findByIdAndUpdate(query, {
                like: like
            })

            // On sauvegarde nous modification
            projet.save((err) => {
                if (err) {
                    req.flash('error', 'Une erreur est survenue !')
                    req.session.error = req.flash('error')
                    res.redirect(`/`)
                }

            })

            req.flash('success', 'Vous aimez ce projet !')
            req.session.success = req.flash('success')
            res.redirect(`/`)

        } else {

            req.flash('error', 'Vous avez déjà voté pour ce projet !')
            req.session.error = req.flash('error')
            res.redirect(`/`)
        }

    },

    removeLike: async(req, res) => {

        const query = req.params.id,
            iduser = req.session.userId,
            projet = await Projet.findById(query),
            likeArr = projet.like

        likeArr.remove(iduser)

        // On sauvegarde nous modification
        projet.save((err) => {
            if (err) {
                req.flash('error', 'Une erreur est survenue !')
                req.session.error = req.flash('error')
                res.redirect(`/`)
            }

        })

        req.flash('success', "Vous n'aimez plus le projet !")
        req.session.success = req.flash('success')
        res.redirect(`/`)
    }
}