/*
 * Import Module
 ****************/
const Tuto = require('../../database/models/tutos'),
paginator = require('./pagination/paginator') // Pour la pagination des pages

/*
 * Controller
 *************/
module.exports = {

    // Method Get pour envoyer les datas vers la page
    getCat: async(req, res) => {

        const success = req.session.success, // Message Succes
            error = req.session.error // Message Error

        req.session.success = undefined
        req.session.error = undefined

        const query = { category: req.params.category }

        // Nombre d'item par page
        var perPage = 12
            // La page que l'on veux récupéré si il y a en pas alors page 1
        var page = req.query.page || 1
        var arrayPagesIndexes = []

        // Ici on recherche nos tutosCat
        Tuto.find(query)
            // Ici On viens chercher l'index qui nous interesse
            // exemple: pour la page 2 avec 5 perPage = index 5
            // donc (5 * 2) - 5 = 5
            .skip((perPage * page) - perPage)
            // Ici on limite le nombre de résultat
            .limit(perPage)
            .lean()
            .exec((err, tutosCat) => {
                if (err) console.log(err)
                    // Ici on compte le nombre d'article total 
                Tuto.countDocuments()
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
                        const prelinks = "/tutoriel",
                        paginationCat = paginator(page, perPage, count, prelinks) // Function paginator

                        if (success || error) {
                            res.render('tutorielCat', {
                                tutosCat: tutosCat,
                                layout: false,
                                success: success,
                                error: error,
                                title: 'Les tutoriels de mon portfolio',
                                content: "Les tutoriels de mon portfolio",
                                // Page sur la quel on est : Number
                                current: page,
                                // Nombre de pages : Number
                                pages: Math.ceil(count / perPage),
                                // tableau avec les index des page: []
                                arrayPage: arrayPagesIndexes,
                                // Pages - 1
                                previous: parseInt(page) - 1,
                                // Pages + 1
                                next: parseInt(page) + 1,
                                paginationCat,
                            })
                        } else {
                            res.render('tutorielCat', {
                                tutosCat: tutosCat,
                                layout: false,
                                error: error,
                                title: 'Les tutoriels de mon portfolio',
                                content: "Les tutoriels de mon portfolio",
                                // Page sur la quel on est : Number
                                current: page,
                                // Nombre de pages : Number
                                pages: Math.ceil(count / perPage),
                                // tableau avec les index des page: []
                                arrayPage: arrayPagesIndexes,
                                // Pages - 1
                                previous: parseInt(page) - 1,
                                // Pages + 1
                                next: parseInt(page) + 1,
                                paginationCat,
                            })
                        }

                    })

            })

    }

}