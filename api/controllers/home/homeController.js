const Projet = require('../../database/models/projets'),
    Tuto = require('../../database/models/tutos'),
    Article = require('../../database/models/articles'),
    Galerie = require('../../database/models/galeries'),
    Comment = require('../../database/models/comments'),
    pagination = require('pagination')

module.exports = {
    get: async(req, res) => {

        const tutos = await Tuto.find({}).lean(), // Cards Tutoriels
            articles = await Article.find({}).sort('-dateCreate').lean(), // Cards Articles
            galeries = await Galerie.find({}).lean(), // Cards Galerie
            commentCount = await Comment.countDocuments(),
            commentsAll = await Comment.find({}).sort('-dateCreate').lean(),
            success = req.session.success, // Message Succes
            error = req.session.error // Message Error

        req.session.success = ''
        req.session.error = ''

        // Nombre d'item par page
        var perPage = 6
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


                                        var boostrapPaginator1 = new pagination.TemplatePaginator({
                                            prelink: '/',
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

                                        var boostrapPaginator2 = new pagination.TemplatePaginator({
                                            prelink: '/',
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
                                        var paginProjet = boostrapPaginator1.render()

                                        var paginTuto = boostrapPaginator2.render()


                                        // Si inscription erreur alors on save pour retourner dans le formulaire inscription
                                        const data1 = req.session.data1,
                                            data2 = req.session.data2,
                                            data3 = req.session.data3,
                                            data4 = req.session.data4

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
                                                paginProjet,
                                                paginTuto,
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
                                                paginProjet,
                                                paginTuto,
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