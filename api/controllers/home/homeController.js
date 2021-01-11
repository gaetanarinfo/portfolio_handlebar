const Projet = require('../../database/models/projets'),
    Tuto = require('../../database/models/tutos'),
    Article = require('../../database/models/articles'),
    Galerie = require('../../database/models/galeries');

module.exports = {
    get: async(req, res) => {
        const projets = await Projet.find({}).lean() // Cards Projets
        const tutos = await Tuto.find({}).lean() // Cards Tutoriels
        const articles = await Article.find({}).sort('-dateCreate').lean() // Cards Articles
        const galeries = await Galerie.find({}).lean() // Cards Galerie

        const success = req.session.success // Message Succes
        const error = req.session.error // Message Error
        req.session.success = ''
        req.session.error = ''

        // Si inscription erreur alors on save pour retourner dans le formulaire inscription
        const data1 = req.session.data1
        const data2 = req.session.data2
        const data3 = req.session.data3
        const data4 = req.session.data4

        if (success || error) {
            res.render('index', { success: success, error: error, projets, tutos, articles, galeries, data1, data2, data3, data4 })
        } else res.render('index', { error: error, projets, tutos, articles, galeries, title: 'Portfolio de Gaëtan Seigneur', content: 'Portfolio de Gaëtan Seigneur', data1, data2, data3, data4 })
    }
}