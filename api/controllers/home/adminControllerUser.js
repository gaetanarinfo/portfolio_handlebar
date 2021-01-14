const User = require('../../database/models/users'),
    fileupload = require("express-fileupload"),
    express = require('express'),
    app = express(),
    pagination = require('pagination')

app.use(fileupload({
    limits: { fileSize: 10 * 1024 * 1024 },
    abortOnLimit: false
}))

module.exports = {

    // Method Get
    showArticle: async(req, res) => {

        const success = req.session.success, // Message Succes
            error = req.session.error // Message Error

        req.session.success = ''
        req.session.error = ''

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


                        var boostrapPaginator = new pagination.TemplatePaginator({
                            prelink: '/admin',
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
                        var pagin = boostrapPaginator.render()

                        User.findOne({ email }, (erro, user) => {
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
                                    pagin,

                                    success: success,
                                    error: error,
                                    layout: 'admin',
                                    title: 'Administration de mon blog',
                                    content: "Partie administration de mon portfolio",
                                    avatar: user.avatar,
                                    name: user.firstname + ' ' + user.lastname,
                                    rang: user.isAdmin,
                                    dateRegister: user.createDate
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
                                    pagin,

                                    error: error,
                                    layout: 'admin',
                                    title: 'Administration de mon blog',
                                    content: "Partie administration de mon portfolio",
                                    avatar: user.avatar,
                                    name: user.firstname + ' ' + user.lastname,
                                    rang: user.isAdmin,
                                    dateRegister: user.createDate
                                })
                            }
                        })
                    })
            })
    },

    addUser: (req, res) => {

        const avatarFile = req.files.avatar

        if (avatarFile.size < 1048576) {

            if (req.body.password.length > 9) {

                avatarFile.mv('public/avatar/' + avatarFile.name, function(err) {
                    if (err) {
                        req.flash('error', 'Une erreur est survenue !')
                        req.session.error = req.flash('error')
                        return res.redirect('/admin')
                    } else {

                        User
                            .create({
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
                    }
                })

            } else {
                req.flash('error', 'Le mot de passe doit contenir minimums 8 caractères !')
                req.session.error = req.flash('error')
                res.redirect('/admin')
            }

        } else {
            req.flash('error', 'Désolé le fichier est trop volumineux !')
            req.session.error = req.flash('error')
            res.redirect('/admin')
        }

    },

    editUser: (req, res) => {

        const id = req.params.id

        User.findOneAndUpdate({ '_id': id }, {
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            email: req.body.email,
            isBanned: req.body.isBanned,
        }, (error) => {

            req.flash('success', 'Le membre ' + req.body.lastname + ' ' + req.body.firstname + ' à été modifié !')
            req.session.success = req.flash('success')

            res.redirect('/admin')

        });

    },

    viewUser: (req, res) => {

        const id = req.params.id

        User.findById({ _id: id }, (erro, user) => {

            res.render('admin')

        })

    },

    deletetUser: (req, res) => {

        const id = req.params.id

        User.findById({ _id: id }, (erro, user) => {

            res.render('admin')

        })

    },

    deleteUserConfirm: (req, res) => {

        const id = req.params.id

        User.findOneAndDelete({ _id: id }, (erro, user) => {

            req.flash('success', 'Le membre à été supprimé !')
            req.session.success = req.flash('success')

            res.redirect('/admin')

        })

    }
}