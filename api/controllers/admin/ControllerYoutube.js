/*
 * Import Module
 ****************/
const Tuto = require('../../database/models/tutos'),
    paginator = require('../../controllers/home/pagination/paginator')

/*
 * Controller
 *************/
module.exports = {

    // Method Get pour recevoir les datas dans la page tutoriel
    showTuto: (req, res) => {
        const success = req.session.success, // Message Succes
            error = req.session.error // Message Error

        req.session.success = undefined
        req.session.error = undefined

        // Nombre d'item par page
        var perPage = 3
            // La page que l'on veux récupéré si il y a en pas alors page 1
        var page = req.query.page || 1
        var arrayPagesIndexes = []

        // Ici on recherche nos tutos
        Tuto.find()
            // Ici On viens chercher l'index qui nous interesse
            // exemple: pour la page 2 avec 5 perPage = index 5
            // donc (5 * 2) - 5 = 5
            .skip((perPage * page) - perPage)
            // Ici on limite le nombre de résultat
            .limit(perPage)
            .lean()
            .exec((err, tutos) => {
                if (err) console.log(err)
                    // Ici on compte le nombre d'article total 
                Tuto.countDocuments()
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
                        const prelinks = "/admin/youtubes/",
                            paginationYoutube = paginator(page, perPage, count, prelinks) // Function paginator

                        if (success || error) {
                            res.render('admin', {
                                // Page sur la quel on est : Number
                                current: page,
                                // Nombre de pages : Number
                                pages: Math.ceil(count / perPage),
                                // tableau avec les index des page: []
                                arrayPage: arrayPagesIndexes,
                                // Les tutos : [{}]
                                tutos: tutos,
                                // Pages - 1
                                previous: parseInt(page) - 1,
                                // Pages + 1
                                next: parseInt(page) + 1,
                                paginationYoutube,
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
                                // Les tutos : [{}]
                                tutos: tutos,
                                // Pages - 1
                                previous: parseInt(page) - 1,
                                // Pages + 1
                                next: parseInt(page) + 1,
                                paginationYoutube,
                                error: error,
                                title: 'Administration de mon blog',
                                content: "Partie administration de mon portfolio",
                                layout: 'admin'
                            })
                        }

                    })
            })
    },

    // Method Post pour ajouter les datas
    addTuto: (req, res) => {

        Tuto
            .create({
                api: req.body.api,
                links: req.body.links,
                title: req.body.title,
                content: req.body.content,
                date: req.body.date,
                isPrivate: Boolean(req.body.isPrivate)
            }, (err) => {
                if (err) {
                    //console.log(err)
                    req.flash('error', 'Une erreur est survenue !')
                    req.session.error = req.flash('error')

                    res.redirect('/admin/youtubes')
                } else {
                    req.flash('success', "La vidéo à été posté !")
                    req.session.success = req.flash('success')

                    res.redirect('/admin/youtubes')
                }

            })

    },

    // Method Post pour editer les datas
    editTuto: (req, res) => {

        const id = req.params.id

        Tuto.findOneAndUpdate({ '_id': id }, {
            title: req.body.title,
            content: req.body.content,
            api: req.body.api,
            date: req.body.date,
            links: req.body.links,
            isPrivate: Boolean(req.body.isPrivate)
        }, (error) => {

            req.flash('success', "La vidéo " + req.body.title + " à été modifié !")
            req.session.success = req.flash('success')

            res.redirect('/admin/youtubes')

        });

    },

    // Method Get pour recevoir les datas dans le modal
    deleteTuto: (req, res) => {

        const id = req.params.id

        Tuto.findById({ _id: id }, (erro, user) => {

            res.render('admin')

        })

    },

    // Method Get pour recevoir les datas dans le modal et comfirmer la suppression
    deleteTutoConfirm: (req, res) => {

        const id = req.params.id

        Tuto.findOneAndDelete({ _id: id }, (erro, user) => {

            req.flash('success', "La vidéo à été supprimé !")
            req.session.success = req.flash('success')

            res.redirect('/admin/youtubes')

        })

    }
}