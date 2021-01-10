const Projet = require('../../database/models/projets');
const Tuto = require('../../database/models/tutos');
const Article = require('../../database/models/articles');
const Galerie = require('../../database/models/galeries');

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

        if (success || error) {
            res.render('index', { success: success, projets, tutos, articles, galeries })
        } else res.render('index', { error: error, projets, tutos, articles, galeries, title: 'Portfolio de Gaëtan Seigneur', content: 'Portfolio de Gaëtan Seigneur' })
    }
}