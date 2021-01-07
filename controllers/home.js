const Projet = require('../database/models/projets');
const Tuto = require('../database/models/tutos');
const Article = require('../database/models/articles');

module.exports = async(req, res) => {

    // Affiche les cards dans une boucle dans l'index
    const projets = await Projet.find({}).lean()
    const tutos = await Tuto.find({}).lean()
    const articles = await Article.find({}).lean()
    res.render('index', { projets, tutos, articles })
}