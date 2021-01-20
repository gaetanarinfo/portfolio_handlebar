const Projet = require('../../database/models/projets'),
    Tuto = require('../../database/models/tutos'),
    Article = require('../../database/models/articles'),
    Galerie = require('../../database/models/galeries'),
    Comment = require('../../database/models/comments'),
    Like = require('../../database/models/like')

module.exports = {
    get: async(req, res) => {

        const projets = await Projet.find({}).populate('like').lean(), // Cards Projets
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
            res.render('index', { success: success, error: error, projets, tutos, articles, commentsAll, commentCount, galeries, data1, data2, data3, data4, title: 'Portfolio de Gaëtan Seigneur', content: "Mon portfolio professionnel, retrouvé ici mes compétences, les derniers articles de mon blog, mes tutoriels et tant d autres choses.", userId: req.session.userId })
        } else res.render('index', { error: error, projets, tutos, articles, galeries, commentsAll, commentCount, title: 'Portfolio de Gaëtan Seigneur', content: "Mon portfolio professionnel, retrouvé ici mes compétences, les derniers articles de mon blog, mes tutoriels et tant d autres choses.", data1, data2, data3, data4, userId: req.session.userId })
    },

    addLike: async(req, res) => {

        Like

        const query = {
            _id: req.params.id
        }

        const projet = await Projet.findById(query)

        // On définit notre construction de Projet
        const like = new Like({
            projetID: projet._id,
            userID: req.session.userId
        })

        projet.like.push(like._id)

        // On sauvegarde nous modification
        like.save((err) => {
            if (err) {
                req.flash('error', 'Une erreur est survenue !')
                req.session.error = req.flash('error')
                res.redirect(`/`)
            }
        })
        projet.save((err) => {
            if (err) {
                req.flash('error', 'Une erreur est survenue !')
                req.session.error = req.flash('error')
                res.redirect(`/`)
            }

        })

        req.flash('success', 'Vous avez aimez le projet !')
        req.session.success = req.flash('success')
        res.redirect(`/`)
    }
}