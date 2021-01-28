const Article = require('../../database/models/articles'),
    Comment = require('../../database/models/comments'),
    pagination = require('pagination')

/*
 * Controller
 *************/
module.exports = {
    // Method Get
    get: async(req, res) => {

        const success = req.session.success, // Message Succes
            error = req.session.error // Message Error

        req.session.success = ''
        req.session.error = ''

        // Nombre d'item par page
        var perPage = 12
            // La page que l'on veux récupéré si il y a en pas alors page 1
        var page = req.query.page || 1
        var arrayPagesIndexes = []

        // Ici on recherche nos articles
        Article.find()
            // Ici On viens chercher l'index qui nous interesse
            // exemple: pour la page 2 avec 5 perPage = index 5
            // donc (5 * 2) - 5 = 5
            .skip((perPage * page) - perPage)
            // Ici on limite le nombre de résultat
            .limit(perPage)
            .populate('comment')
            .sort('-dateCreate')
            .lean()
            .exec((err, articles) => {
                if (err) console.log(err)
                    // Ici on compte le nombre d'article total 
                Article.countDocuments()
                    .exec((err, count) => {
                        if (err) return next(err)
                            // Ici on calcul le nombre de pages
                        var allPagesNumber = Math.ceil(count / perPage)
                            // On fait une boucle sur le nombre total de page
                        for (i = 0; i < allPagesNumber; i++) {
                            // On push nos index dans le tableau
                            arrayPagesIndexes.push(i + 1)
                        }

                        var boostrapPaginator2 = new pagination.TemplatePaginator({
                            prelink: '/admin/articles/',
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
                        var pagin = boostrapPaginator2.render()

                        if (success || error) {
                            res.render('blog', {
                                // Page sur la quel on est : Number
                                current: page,
                                // Nombre de pages : Number
                                pages: Math.ceil(count / perPage),
                                // tableau avec les index des page: []
                                arrayPage: arrayPagesIndexes,
                                // Les articles : [{}]
                                articles: articles,
                                // Pages - 1
                                previous: parseInt(page) - 1,
                                // Pages + 1
                                next: parseInt(page) + 1,
                                pagin,
                                success: success,
                                error: error,
                                title: 'Mon blog personnel',
                                content: 'Portfolio de Gaëtan Seigneur'
                            })
                        } else {
                            res.render('blog', {
                                // Page sur la quel on est : Number
                                current: page,
                                // Nombre de pages : Number
                                pages: Math.ceil(count / perPage),
                                // tableau avec les index des page: []
                                arrayPage: arrayPagesIndexes,
                                // Les articles : [{}]
                                articles: articles,
                                // Pages - 1
                                previous: parseInt(page) - 1,
                                // Pages + 1
                                next: parseInt(page) + 1,
                                pagin,
                                error: error,
                                title: 'Mon blog personnel',
                                content: 'Portfolio de Gaëtan Seigneur'
                            })
                        }

                    })
            })

    }

}