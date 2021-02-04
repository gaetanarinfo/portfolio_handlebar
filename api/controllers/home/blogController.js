/*
 * Import Module
 ****************/
const Article = require('../../database/models/articles'),
    paginator = require('./pagination/paginator')

/*
 * Controller
 *************/
module.exports = {

    // Method Get pour envoyer les datas vers la page
    get: async(req, res) => {

        const success = req.session.success, // Message en cas de success
            error = req.session.error // Message en cas d'erreur

        req.session.success = undefined // Définie le cookie de message success
        req.session.error = undefined // Définie le cookie de message error

        // Nombre d'item par page
        var perPage = 12

        // La page que l'on veux récupéré si il y a en pas alors page 1
        var page = req.query.page || 1
        var arrayPagesIndexes = []

        // Ici on recherche nos articles
        Article.find()
            // Ici On viens chercher l'index qui nous interesse
            // exemple: pour la page 2 avec 5 perPage = index 5
            // donc (5 * 2) - 5 = 5
            .skip((perPage * page) - perPage)
            // Ici on limite le nombre de résultat
            .limit(perPage) // Limitattion des résultat par page
            .populate('comment') // Nous utilisons populate afin de ressortir les datas des models en relation avec notre constructeur principal
            .sort('-dateCreate') // On trie les articles par dates
            .lean() // Permet de lire les datas
            .exec((err, articles) => {
                if (err) console.log(err)
                    // Ici on compte le nombre d'article total 
                Article.countDocuments()
                    .exec((err, count) => {
                        if (err) return next(err)
                            // Ici on calcul le nombre de pages
                        var allPagesNumber = Math.ceil(count / perPage)
                            // On fait une boucle sur le nombre total de page
                        for (i = 0; i < allPagesNumber; i++) {
                            // On push nos index dans le tableau
                            arrayPagesIndexes.push(i + 1)
                        }

                        // Function de pagination de page
                        const prelinks = "/blog",
                            pagination = paginator(page, perPage, count, prelinks) // Function paginator

                        // Render page
                        if (success || error) {
                            res.render('blog', {
                                // Page sur la quel on est : Number
                                current: page,
                                // Nombre de pages : Number
                                pages: Math.ceil(count / perPage),
                                // tableau avec les index des page: []
                                arrayPage: arrayPagesIndexes,
                                // Les articles : [{}]
                                articles: articles,
                                // Pages - 1
                                previous: parseInt(page) - 1,
                                // Pages + 1
                                next: parseInt(page) + 1,
                                pagination,
                                success: success,
                                error: error,
                                title: 'Mon blog personnel',
                                content: 'Portfolio de Gaëtan Seigneur'
                            })
                        } else {
                            res.render('blog', {
                                // Page sur la quel on est : Number
                                current: page,
                                // Nombre de pages : Number
                                pages: Math.ceil(count / perPage),
                                // tableau avec les index des page: []
                                arrayPage: arrayPagesIndexes,
                                // Les articles : [{}]
                                articles: articles,
                                // Pages - 1
                                previous: parseInt(page) - 1,
                                // Pages + 1
                                next: parseInt(page) + 1,
                                pagination,
                                error: error,
                                title: 'Mon blog personnel',
                                content: 'Portfolio de Gaëtan Seigneur'
                            })
                        }

                    })
            })

    }

}