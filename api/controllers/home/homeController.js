/*
 * Import Module
 ****************/
const Projet = require('../../database/models/projets'),
    Tuto = require('../../database/models/tutos'),
    Article = require('../../database/models/articles'),
    Galerie = require('../../database/models/galeries'),
    Comment = require('../../database/models/comments'),
<<<<<<< HEAD
    paginator = require('./pagination/paginator')
=======
    renderHome = require('./render/renderHome')
>>>>>>> origin/dev

/*
 * Controller
 *************/
module.exports = {

    // Method Get pour envoyer les datas
    get: async(req, res) => {

        const tutos = await Tuto.find({}).lean(), // Cards Tutoriels
            articles = await Article.find({}).sort('-dateCreate').lean(), // Cards Articles
            galeries = await Galerie.find({}).lean(), // Cards Galerie
            commentCount = await Comment.countDocuments(), // Compter le nombre de commantaire
            commentsAll = await Comment.find({}).sort('-dateCreate').lean(), // Affiche les commentaires dansd le footer
<<<<<<< HEAD
            success = req.session.success, // Message Success
=======
            success = req.session.success, // Message Succes
>>>>>>> origin/dev
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
            .limit(perPage) // Limitattion des résultat par page
            .lean() // Permet de lire les datas
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

<<<<<<< HEAD
                                        // Si inscription erreur alors on sauvegarde pour retourner les datas dans le formulaire
                                        const data1 = req.session.data1,
                                            data2 = req.session.data2,
                                            data3 = req.session.data3,
                                            data4 = req.session.data4

                                        // Function de pagination de page
                                        const prelinks = "/",
                                            paginationProjet = paginator(page, perPage, count, prelinks) // Function paginator

                                        if (success || error) {
                                            res.render('index', {
                                                success: success,
                                                error: error,
                                                // Page sur la quel on est : Number
                                                current: page,
                                                // Nombre de pages : Number
                                                pages: Math.ceil(count / perPage),
                                                // tableau avec les index des page: []
                                                arrayPage: arrayPagesIndexes,
                                                // Les projets : [{}]
                                                projets: projets,
                                                // Pages - 1
                                                previous: parseInt(page) - 1,
                                                // Pages + 1
                                                next: parseInt(page) + 1,
                                                paginationProjet,
                                                tutos,
                                                articles,
                                                commentsAll,
                                                commentCount,
                                                galeries,
                                                data1,
                                                data2,
                                                data3,
                                                data4,
                                                title: 'Portfolio de Gaëtan Seigneur',
                                                content: "Mon portfolio professionnel, retrouvé ici mes compétences, les derniers articles de mon blog, mes tutoriels et tant d autres choses."
                                            })
                                        } else
                                            res.render('index', {
                                                error: error,
                                                // Page sur la quel on est : Number
                                                current: page,
                                                // Nombre de pages : Number
                                                pages: Math.ceil(count / perPage),
                                                // tableau avec les index des page: []
                                                arrayPage: arrayPagesIndexes,
                                                // Les projets : [{}]
                                                projets: projets,
                                                // Pages - 1
                                                previous: parseInt(page) - 1,
                                                // Pages + 1
                                                next: parseInt(page) + 1,
                                                paginationProjet,
                                                tutos,
                                                articles,
                                                galeries,
                                                commentsAll,
                                                commentCount,
                                                data1,
                                                data2,
                                                data3,
                                                data4,
                                                title: 'Portfolio de Gaëtan Seigneur',
                                                content: "Mon portfolio professionnel, retrouvé ici mes compétences, les derniers articles de mon blog, mes tutoriels et tant d autres choses."
                                            })
=======
                                        // Module pour le render Home
                                        renderHome(req, res, success, error, page, count, perPage, projets, arrayPagesIndexes, tutos, articles, galeries, commentsAll, commentCount)
>>>>>>> origin/dev

                                    })
                            })

                    })
            })


    },

    // Création d'un like user sur projet
    addLike: async(req, res) => {


        // Déclaration des constantes
        const query = req.params.id,
            iduser = req.session.userId,
            projet = await Projet.findById(query),
            like = projet.like

        // On vérifie si l'user à déjà liké
        if (like != iduser) {

            // On push dans la colletion Projet l'id de l'utilistateur
            like.push(iduser)

            // On met à jour la collection projet
            Projet.findByIdAndUpdate(query, {
                like: like
            })

            // On sauvegarde les modifications
            projet.save((err) => {
                if (err) {
                    req.flash('error', 'Une erreur est survenue !')
                    req.session.error = req.flash('error')
                    res.redirect(`/`)
                }

            })

            // Message en cas de success
            req.flash('success', 'Vous aimez ce projet !')
            req.session.success = req.flash('success')
            res.redirect(`/`)

        } else {

            // Message en cas de error
            req.flash('error', 'Vous avez déjà voté pour ce projet !')
            req.session.error = req.flash('error')
            res.redirect(`/`)
        }

    },

    // Suppression des likes
    removeLike: async(req, res) => {

        // Déclaration des constantes
        const query = req.params.id,
            iduser = req.session.userId,
            projet = await Projet.findById(query),
            likeArr = projet.like

        likeArr.remove(iduser)

        // On sauvegarde les modifications
        projet.save((err) => {
            if (err) {
                // Message en cas de error
                req.flash('error', 'Une erreur est survenue !')
                req.session.error = req.flash('error')
                res.redirect(`/`)
            }

        })

        // Message en cas de success
        req.flash('success', "Vous n'aimez plus le projet !")
        req.session.success = req.flash('success')
        res.redirect(`/`)
    }
}