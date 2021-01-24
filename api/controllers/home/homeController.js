const Projet = require('../../database/models/projets'),
    Tuto = require('../../database/models/tutos'),
    Article = require('../../database/models/articles'),
    Galerie = require('../../database/models/galeries'),
    Comment = require('../../database/models/comments')

module.exports = {
    get: async(req, res) => {

        const projets = await Projet.find({}).lean(), // Cards Projets
            tutos = await Tuto.find({}).lean(), // Cards Tutoriels
            articles = await Article.find({}).sort('-dateCreate').lean(), // Cards Articles
            galeries = await Galerie.find({}).lean(), // Cards Galerie
            commentCount = await Comment.countDocuments(),
            commentsAll = await Comment.find({}).sort('-dateCreate').lean(),
            success = req.session.success, // Message Succes
            error = req.session.error // Message Error

        req.session.success = ''
        req.session.error = ''

        // Si inscription erreur alors on save pour retourner dans le formulaire inscription
        const data1 = req.session.data1,
            data2 = req.session.data2,
            data3 = req.session.data3,
            data4 = req.session.data4

        if (success || error) {
            res.render('index', { success: success, error: error, projets, tutos, articles, commentsAll, commentCount, galeries, data1, data2, data3, data4, title: 'Portfolio de Gaëtan Seigneur', content: "Mon portfolio professionnel, retrouvé ici mes compétences, les derniers articles de mon blog, mes tutoriels et tant d autres choses." })
        } else res.render('index', { error: error, projets, tutos, articles, galeries, commentsAll, commentCount, title: 'Portfolio de Gaëtan Seigneur', content: "Mon portfolio professionnel, retrouvé ici mes compétences, les derniers articles de mon blog, mes tutoriels et tant d autres choses.", data1, data2, data3, data4 })
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