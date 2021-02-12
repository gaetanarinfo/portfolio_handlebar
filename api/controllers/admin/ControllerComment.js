/*
 * Import Module
 ****************/
const Comment = require('../../database/models/comments'),
    paginator = require('../../controllers/home/pagination/paginator')

/*
 * Controller
 *************/
module.exports = {

    // Method Get pour recevoir les datas dans la page comment
    showComment: (req, res) => {

        const success = req.session.success, // Message Succes
            error = req.session.error // Message Error

        req.session.success = undefined
        req.session.error = undefined
<<<<<<< HEAD
=======

        const email = req.session.email
>>>>>>> origin/dev

        // Nombre d'item par page
        var perPage = 6
            // La page que l'on veux récupéré si il y a en pas alors page 1
        var page = req.query.page || 1
        var arrayPagesIndexes = []

        // Ici on recherche nos comments
        Comment.find()
            // Ici On viens chercher l'index qui nous interesse
            // exemple: pour la page 2 avec 5 perPage = index 5
            // donc (5 * 2) - 5 = 5
            .skip((perPage * page) - perPage)
            // Ici on limite le nombre de résultat
            .limit(perPage)
            .lean()
            .exec((err, comments) => {
                if (err) console.log(err)
                    // Ici on compte le nombre d'article total 
                Comment.countDocuments()
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
                        const prelinks = "/admin/comments/",
                            paginationComment = paginator(page, perPage, count, prelinks) // Function paginator

                        if (success || error) {
                            res.render('admin', {
                                // Page sur la quel on est : Number
                                current: page,
                                // Nombre de pages : Number
                                pages: Math.ceil(count / perPage),
                                // tableau avec les index des page: []
                                arrayPage: arrayPagesIndexes,
                                // Les comments : [{}]
                                comments: comments,
                                // Pages - 1
                                previous: parseInt(page) - 1,
                                // Pages + 1
                                next: parseInt(page) + 1,
                                paginationComment,
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
                                // Les comments : [{}]
                                comments: comments,
                                // Pages - 1
                                previous: parseInt(page) - 1,
                                // Pages + 1
                                next: parseInt(page) + 1,
                                paginationComment,
                                error: error,
                                title: 'Administration de mon blog',
                                content: "Partie administration de mon portfolio",
                                layout: 'admin'
                            })
                        }

                    })
            })

    },

    // Method Post pour editer les datas
    editComment: (req, res) => {

        const id = req.params.id

        Comment.findOneAndUpdate({ '_id': id }, {
            author: req.body.author,
            avatar: req.body.avatar,
            dateCreate: req.body.dateCreate,
            content: req.body.content
        }, (error) => {

            req.flash('success', "Le commentaire de  " + req.body.author + " à été modifié !")
            req.session.success = req.flash('success')

            res.redirect('/admin/comments')

        });

    },

    // Method Get pour recevoir les datas dans le modal
    deleteComment: (req, res) => {

        const id = req.params.id

        Comment.findById({ _id: id }, (erro, user) => {

            res.render('admin')

        })

    },

    // Method Get pour recevoir les datas dans le modal et comfirmer la suppression
    deleteCommentConfirm: (req, res) => {

        const id = req.params.id

        Comment.findOneAndDelete({ _id: id }, (erro, user) => {

            req.flash('success', "Le commentaire à bien été supprimé !")
            req.session.success = req.flash('success')

            res.redirect('/admin/comments')

        })

    }
}