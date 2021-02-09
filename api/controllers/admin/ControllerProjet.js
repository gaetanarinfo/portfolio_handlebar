/*
 * Import Module
 ****************/
const Projet = require('../../database/models/projets'),
    path = require('path'),
    fs = require('fs'),
    paginator = require('../../controllers/home/pagination/paginator')

/*
 * Controller
 *************/
module.exports = {

    // Method Get pour recevoir les datas dans la page projet
    showProjet: (req, res) => {

        const success = req.session.success, // Message Succes
            error = req.session.error // Message Error

        req.session.success = undefined
        req.session.error = undefined

        // Nombre d'item par page
        var perPage = 4
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

                        // Function de pagination de page
                        const prelinks = "/admin/projets/",
                            paginationProjet = paginator(page, perPage, count, prelinks) // Function paginator

                        if (success || error) {
                            res.render('admin', {
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
                                success: success,
                                error: error,
                                title: 'Administration de mon blog',
                                content: "Partie administration de mon portfolio",
                                layout: 'admin'
                            })
                        } else {
                            res.render('admin', {
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
                                error: error,
                                title: 'Administration de mon blog',
                                content: "Partie administration de mon portfolio",
                                layout: 'admin'
                            })
                        }

                    })
            })

    },

    // Method Post pour envoyer les datas
    addProjet: (req, res) => {

        const image = req.file.originalname;

        Projet
            .create({
                image: `/images/projets/${image}`,
                name: image,
                title: req.body.title,
                content: req.body.content,
                date: req.body.date,
                isPrivate: Boolean(req.body.isPrivate)
            }, (err) => {
                if (err) {
                    //console.log(err)
                    req.flash('error', 'Une erreur est survenue !')
                    req.session.error = req.flash('error')

                    res.redirect('/admin/projets')
                } else {
                    req.flash('success', "Le projet à été posté !")
                    req.session.success = req.flash('success')

                    res.redirect('/admin/projets')
                }

            })

    },

    // Method Post pour editer les datas
    editProjet: async(req, res) => {

        // On declare notre projetID (Objet à éditer)
        const projetID = await Projet.findById(req.params.id),
            // Query qui est l'id de notre objet à éditer
            query = { _id: req.params.id },
            // pathImg sera le chemin de notre fichier à supprimer
            pathImg = path.resolve("./public/images/projets/" + projetID.name)

        // Condition pour verifier qu'il n'y a pas de fichier dans notre formulaire
        if (!req.file) {

            // condition pour verifier que nous avons un title dans le formulaire
            if (req.body.title) {
                // Ici nous éditons le titre de notre Article selectionner grace à query
                Projet.updateOne(query, {
                    title: req.body.title,
                    content: req.body.content,
                    date: req.body.date,
                    isPrivate: Boolean(req.body.isPrivate),
                    // et notre callback d'error
                }, (err) => {
                    if (err) {
                        res.redirect('/admin/projets')
                    } else {
                        req.flash('success', "Le projet " + req.body.title + " à été modifié !")
                        req.session.success = req.flash('success')

                        res.redirect('/admin/projets')
                    }
                })
            } else {

                req.flash('success', "Le projet " + req.body.title + " à été modifié !")
                req.session.success = req.flash('success')

                res.redirect('/admin/projets')

            }

            // Sinon (Donc si nous avont un fichier (image) dans notre formulaire)
        } else {
            // Ici nous éditons notre article selectionner grâce à query
            Projet.updateOne(query, {
                // on récupère tout notre req.body
                title: req.body.title,
                content: req.body.content,
                date: req.body.date,
                isPrivate: Boolean(req.body.isPrivate),
                // ici on viens stocker le chemin de l'image dans la DB
                image: `/images/projets/${req.file.originalname}`,
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

                    req.flash('success', "Le projet " + req.body.title + " à été modifié !")
                    req.session.success = req.flash('success')

                    res.redirect('/admin/projets')

                }

            })
        }

    },

    // Method Get pour recevoir les datas dans le modal
    deletetProjet: (req, res) => {

        const id = req.params.id

        Projet.findById({ _id: id }, (erro, user) => {

            res.render('admin')

        })

    },

    // Method Get pour recevoir les datas dans le modal et comfirmer la suppression
    deleteProjetConfirm: async(req, res) => {

        // Ici on déclare la récupération de notre projetID grace à notre recherche asynchrone filtrer avec notre req.params.id
        const dbProjet = await Projet.findById(req.params.id),
            // Ici on déclare le chemin de l'image qui devra etre supprimer
            pathImg = path.resolve("./public/images/projets/" + dbProjet.name)

        // Ici nous avons une fonction de suppression de notre article filtrer grace à req.params.id (objet dans la DB)
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
                        req.flash('success', "Le projet à été supprimé !")
                        req.session.success = req.flash('success')

                        res.redirect('/admin/projets')
                    }
                })
            }
        })

    }

}