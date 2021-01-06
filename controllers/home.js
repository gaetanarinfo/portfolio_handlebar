var Projet = require('../database/models/projets');
var Tuto = require('../database/models/tutos');
var Article = require('../database/models/articles');

module.exports = async(req, res) => {

    // Affiche les cards dans une boucle dans l'index
    var projets = await Projet.find({}).lean()
    var tutos = await Tuto.find({}).lean()
    var articles = await Article.find({}).lean()
    res.render('index', { projets, tutos, articles })
}