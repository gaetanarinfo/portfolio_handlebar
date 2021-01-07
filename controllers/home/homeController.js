const Projet = require('../../database/models/projets');
const Tuto = require('../../database/models/tutos');
const Article = require('../../database/models/articles');

module.exports = {
    get: async(req, res) => {
        const projets = await Projet.find({}).lean()
        const tutos = await Tuto.find({}).lean()
        const articles = await Article.find({}).lean()
        const success = req.session.success
        req.session.success = ''

        if (success) {
            res.render('index', { success: success })
        } else res.render('index')
    }
}