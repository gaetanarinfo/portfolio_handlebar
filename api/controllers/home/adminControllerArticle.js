const Article = require('../../database/models/articles'),
    fileupload = require("express-fileupload"),
    express = require('express'),
    app = express(),
    pagination = require('pagination')

app.use(fileupload())

module.exports = {

    addArticle: (req, res) => {

        const imageFile = req.files.image

        imageFile.mv('public/article/' + imageFile.name, function(err) {
            if (err) {
                req.flash('error', 'Une erreur est survenue !')
                req.session.error = req.flash('error')
                return res.redirect('/admin')
            } else {

                Article
                    .create({
                        image: '/article/' + imageFile.name,
                        title: req.body.title,
                        content: req.body.content,
                        author: req.session.lastname + ' ' + req.session.firstname,
                        dateCreate: new Date(),
                        active: false,
                        avatar: req.session.avatar
                    }, (err) => {
                        if (err) {
                            //console.log(err)
                            req.flash('error', 'Une erreur est survenue !')
                            req.session.error = req.flash('error')

                            res.redirect('/admin')
                        } else {
                            req.flash('success', "L'article à été posté !")
                            req.session.success = req.flash('success')

                            res.redirect('/admin')
                        }

                    })

            }

        })

    },

}