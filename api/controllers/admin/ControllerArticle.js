const Article = require('../../database/models/articles'),
    User = require('../../database/models/users'),
    fileupload = require("express-fileupload"),
    express = require('express'),
    app = express(),
    pagination = require('pagination')

app.use(fileupload())

module.exports = {

    showArticle: (req, res) => {


        const success = req.session.success, // Message Succes
            error = req.session.error // Message Error

        req.session.success = ''
        req.session.error = ''

        const email = req.session.email

        // Nombre d'item par page
        var perPage = 6
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
                        var pagin2 = boostrapPaginator2.render()

                        User.findOne({ email }, (erro, user) => {
                            if (success || error) {
                                res.render('admin', {
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
                                    pagin2,

                                    success: success,
                                    error: error,
                                    title: 'Administration de mon blog',
                                    content: "Partie administration de mon portfolio",
                                    avatar: user.avatar,
                                    name: user.firstname + ' ' + user.lastname,
                                    rang: user.isAdmin,
                                    dateRegister: user.createDate,
                                    dateLog: user.isLog,
                                    ip: user.ip,
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
                                    // Les articles : [{}]
                                    articles: articles,
                                    // Pages - 1
                                    previous: parseInt(page) - 1,
                                    // Pages + 1
                                    next: parseInt(page) + 1,
                                    pagin2,

                                    error: error,

                                    title: 'Administration de mon blog',
                                    content: "Partie administration de mon portfolio",
                                    avatar: user.avatar,
                                    name: user.firstname + ' ' + user.lastname,
                                    rang: user.isAdmin,
                                    dateRegister: user.createDate,
                                    dateLog: user.isLog,
                                    ip: user.ip,
                                    layout: 'admin'
                                })
                            }

                        })

                    })
            })

    },

    addArticle: (req, res) => {

        const imageFile = req.files.image

        imageFile.mv('public/article/' + imageFile.name, function(err) {
            if (err) {
                req.flash('error', 'Une erreur est survenue !')
                req.session.error = req.flash('error')
                return res.redirect('/admin/articles')
            } else {

                Article
                    .create({
                        image: '/article/' + imageFile.name,
                        title: req.body.title,
                        content: req.body.content,
                        author: req.session.lastname + ' ' + req.session.firstname,
                        dateCreate: new Date(),
                        active: false,
                        avatar: req.session.avatar,
                        isPrivate: Boolean(req.body.isPrivate),
                        comment: 0
                    }, (err) => {
                        if (err) {
                            //console.log(err)
                            req.flash('error', 'Une erreur est survenue !')
                            req.session.error = req.flash('error')

                            res.redirect('/admin/articles')
                        } else {
                            req.flash('success', "L'article à été posté !")
                            req.session.success = req.flash('success')

                            res.redirect('/admin/articles')
                        }

                    })

            }

        })

    },

    editArticle: (req, res) => {

        const id = req.params.id

        Article.findOneAndUpdate({ '_id': id }, {
            title: req.body.title,
            content: req.body.content,
            isPrivate: Boolean(req.body.isPrivate),
        }, (error) => {

            req.flash('success', "L'article " + req.body.title + " à été modifié !")
            req.session.success = req.flash('success')

            res.redirect('/admin/articles')

        });

    },

    deletetArticle: (req, res) => {

        const id = req.params.id

        Article.findById({ _id: id }, (erro, user) => {

            res.render('admin')

        })

    },

    deleteArticleConfirm: (req, res) => {

        const id = req.params.id

        Article.findOneAndDelete({ _id: id }, (erro, user) => {

            req.flash('success', "L'actualité à été supprimé !")
            req.session.success = req.flash('success')

            res.redirect('/admin/articles')

        })

    }

}