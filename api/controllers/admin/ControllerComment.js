const Comment = require('../../database/models/comments'),
    User = require('../../database/models/users'),
    pagination = require('pagination')

module.exports = {

    showComment: (req, res) => {

        const success = req.session.success, // Message Succes
            error = req.session.error // Message Error

        req.session.success = undefined
        req.session.error = undefined

        const email = req.session.email

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


                        var boostrapPaginator3 = new pagination.TemplatePaginator({
                            prelink: '/admin/comments/',
                            current: page,
                            rowsPerPage: perPage,
                            totalResult: count,
                            slashSeparator: false,
                            template: function(result) {
                                var i, len, prelink;
                                var html = '<div class="mt-4"><ul class="pagination justify-content-center mt-1">';
                                if (result.pageCount < 2) {
                                    html += '</ul></div>';
                                    return html;
                                }
                                prelink = this.preparePreLink(result.prelink);
                                if (result.previous) {
                                    html += '<li class="page-item"><a class="page-link" href="' + prelink + result.previous + '">' + '<i class="fas fa-angle-left"></i></a></li>';
                                }
                                if (result.range.length) {
                                    for (i = 0, len = result.range.length; i < len; i++) {
                                        if (result.range[i] === result.current) {
                                            html += '<li class="active page-item"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
                                        } else {
                                            html += '<li class="page-item"><a class="page-link" href="' + prelink + result.range[i] + '">' + result.range[i] + '</a></li>';
                                        }
                                    }
                                }
                                if (result.next) {
                                    html += '<li class="page-item"><a class="page-link" href="' + prelink + result.next + '" class="paginator-next">' + '<i class="fas fa-angle-right"></i></a></li>';
                                }
                                html += '</ul></div>';
                                return html;
                            }
                        });

                        // Render de la pagination
                        var pagin6 = boostrapPaginator3.render()

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
                                pagin6,

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
                                pagin6,

                                error: error,

                                title: 'Administration de mon blog',
                                content: "Partie administration de mon portfolio",
                                layout: 'admin'
                            })
                        }

                    })
            })

    },

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

    deleteComment: (req, res) => {

        const id = req.params.id

        Comment.findById({ _id: id }, (erro, user) => {

            res.render('admin')

        })

    },

    deleteCommentConfirm: (req, res) => {

        const id = req.params.id

        Comment.findOneAndDelete({ _id: id }, (erro, user) => {

            req.flash('success', "Le commentaire à bien été supprimé !")
            req.session.success = req.flash('success')

            res.redirect('/admin/comments')

        })

    }
}