/*
 * Import Module
 ****************/
const paginator = require('../pagination/paginator')

module.exports = function(req, res, success, error, page, count, perPage, projets, arrayPagesIndexes, tutos, articles, galeries, commentsAll, commentCount) {

    // Si inscription erreur alors on sauvegarde pour retourner les datas dans le formulaire
    const data1 = req.session.data1,
        data2 = req.session.data2,
        data3 = req.session.data3,
        data4 = req.session.data4,
        pagin = paginator(page, perPage, count)

        console.log(pagin);

    if (success || error) {
        res.render('index', {
            success: success,
            error: error,
            // Page sur la quel on est : Number
            current: page,
            // Nombre de pages : Number
            pages: Math.ceil(count / perPage),
            // tableau avec les index des page: []
            arrayPage: arrayPagesIndexes,
            // Les projets : [{}]
            projets: projets,
            // Pages - 1
            previous: parseInt(page) - 1,
            // Pages + 1
            next: parseInt(page) + 1,
            pagin,
            tutos,
            articles,
            commentsAll,
            commentCount,
            galeries,
            data1,
            data2,
            data3,
            data4,
            title: 'Portfolio de Gaëtan Seigneur',
            content: "Mon portfolio professionnel, retrouvé ici mes compétences, les derniers articles de mon blog, mes tutoriels et tant d autres choses."
        })
    } else
        res.render('index', {
            error: error,
            // Page sur la quel on est : Number
            current: page,
            // Nombre de pages : Number
            pages: Math.ceil(count / perPage),
            // tableau avec les index des page: []
            arrayPage: arrayPagesIndexes,
            // Les projets : [{}]
            projets: projets,
            // Pages - 1
            previous: parseInt(page) - 1,
            // Pages + 1
            next: parseInt(page) + 1,
            pagin,
            tutos,
            articles,
            galeries,
            commentsAll,
            commentCount,
            data1,
            data2,
            data3,
            data4,
            title: 'Portfolio de Gaëtan Seigneur',
            content: "Mon portfolio professionnel, retrouvé ici mes compétences, les derniers articles de mon blog, mes tutoriels et tant d autres choses."
        })

}