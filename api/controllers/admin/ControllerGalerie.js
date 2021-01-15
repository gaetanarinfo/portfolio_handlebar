const Galerie = require('../../database/models/galeries'),
    User = require('../../database/models/users'),
    pagination = require('pagination')

module.exports = {

    showGalerie: (req, res) => {

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

        // Ici on recherche nos galeries
        Galerie.find()
            // Ici On viens chercher l'index qui nous interesse
            // exemple: pour la page 2 avec 5 perPage = index 5
            // donc (5 * 2) - 5 = 5
            .skip((perPage * page) - perPage)
            // Ici on limite le nombre de résultat
            .limit(perPage)
            .lean()
            .exec((err, galeries) => {
                if (err) console.log(err)
                    // Ici on compte le nombre d'article total 
                Galerie.countDocuments()
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
                            prelink: '/admin/galeries/',
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
                        var pagin4 = boostrapPaginator3.render()

                        User.findOne({ email }, (erro, user) => {
                            if (success || error) {
                                res.render('admin', {
                                    // Page sur la quel on est : Number
                                    current: page,
                                    // Nombre de pages : Number
                                    pages: Math.ceil(count / perPage),
                                    // tableau avec les index des page: []
                                    arrayPage: arrayPagesIndexes,
                                    // Les galeries : [{}]
                                    galeries: galeries,
                                    // Pages - 1
                                    previous: parseInt(page) - 1,
                                    // Pages + 1
                                    next: parseInt(page) + 1,
                                    pagin4,

                                    success: success,
                                    error: error,
                                    title: 'Administration de mon blog',
                                    content: "Partie administration de mon portfolio",
                                    avatar: user.avatar,
                                    name: user.firstname + ' ' + user.lastname,
                                    rang: user.isAdmin,
                                    dateRegister: user.createDate,
                                    dateLog: user.isLog,
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
                                    // Les galeries : [{}]
                                    galeries: galeries,
                                    // Pages - 1
                                    previous: parseInt(page) - 1,
                                    // Pages + 1
                                    next: parseInt(page) + 1,
                                    pagin4,

                                    error: error,

                                    title: 'Administration de mon blog',
                                    content: "Partie administration de mon portfolio",
                                    avatar: user.avatar,
                                    name: user.firstname + ' ' + user.lastname,
                                    rang: user.isAdmin,
                                    dateRegister: user.createDate,
                                    dateLog: user.isLog,
                                    layout: 'admin'
                                })
                            }

                        })

                    })
            })

    },

    addGalerie: (req, res) => {

        const imageFile = req.files.image

        imageFile.mv('public/images/galerie/' + imageFile.name, function(err) {
            if (err) {
                req.flash('error', 'Une erreur est survenue !')
                req.session.error = req.flash('error')
                return res.redirect('/admin/galeries')
            } else {

                Galerie
                    .create({
                        image: '/images/galerie/' + imageFile.name,
                        title: req.body.title,
                        active: false
                    }, (err) => {
                        if (err) {
                            //console.log(err)
                            req.flash('error', 'Une erreur est survenue !')
                            req.session.error = req.flash('error')

                            res.redirect('/admin/galeries')
                        } else {
                            req.flash('success', "L'image à été ajouté à la galerie !")
                            req.session.success = req.flash('success')

                            res.redirect('/admin/galeries')
                        }

                    })

            }

        })

    },

    editGalerie: (req, res) => {

        const id = req.params.id

        Galerie.findOneAndUpdate({ '_id': id }, {
            title: req.body.title,
            image: req.body.image,
        }, (error) => {

            req.flash('success', "L'image " + req.body.title + " à été modifié !")
            req.session.success = req.flash('success')

            res.redirect('/admin/galeries')

        });

    },

    deleteGalerie: (req, res) => {

        const id = req.params.id

        Galerie.findById({ _id: id }, (erro, user) => {

            res.render('admin')

        })

    },

    deleteGalerieConfirm: (req, res) => {

        const id = req.params.id

        Galerie.findOneAndDelete({ _id: id }, (erro, user) => {

            req.flash('success', "L'image de la galerie à été supprimé !")
            req.session.success = req.flash('success')

            res.redirect('/admin/galeries')

        })

    }

}