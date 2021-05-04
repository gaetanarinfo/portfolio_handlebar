/*
 * Import Module
 ****************/
const Article = require('../../database/models/articles'),
    Comment = require('../../database/models/comments')

/*
 * Controller
 *************/
module.exports = {

    // Method Get pour envoyer les datas vers la page
    get: async(req, res) => {

        const commentCount = await Comment.countDocuments(), // Compter le nombre de commantaire
            commentsAll = await Comment.find({}).sort('-dateCreate').lean() // Affiche les commentaires dansd le footer

        const success = req.session.success // Message Succes
        const error = req.session.error // Message Error

        req.session.success = undefined // Message Succes
        req.session.error = undefined // Message Error

        // On viens definir nos constante
        // Ici query est égale à l'id envoyer via l'URL /article/:id
        const query = req.params.id

        // Si la page n'a pas d'id on le redirige vers la page blog
        if (!query) res.redirect('/blog')

        // Ici nous resortons notre constructeur
        Article
        // Nous recherchons une article ayant le meme ID que notre req.params.id
            .findById(query)
            // Nous utilisons populate afin de ressortir les datas des models en relation avec notre constructeur principal
            .populate('comment')
            .lean() // On affiche le résultat

        // Nous executons notre recherche
        .exec((err, result) => {
            if (!result) {
                res.redirect("/blog") // On redirige sur la page blog si il y a une erreur
            } else {

                if (err) {
                    // Message en cas d'erreur
                    req.flash('error', 'Une erreur est survenue !')
                    req.session.error = req.flash('error')
                    res.redirect("/article/" + req.body.articleid)
                };

                // Render page
                if (success || error) {
                    res.render('article', {
                        success: success,
                        artID: result,
                        commentsAll,
                        commentCount
                    })
                } else {
                    res.render('article', {
                        error: error,
                        success: success,
                        artID: result,
                        commentsAll,
                        commentCount
                    })
                }

            }

        })
    },

    // Method Post pour recevoir les datas des commentaires
    post: async(req, res) => {

        Comment

        // On déclare une constante query
        const query = {
            _id: req.params.id
        }

        // On définit nos Objet en relation avec notre commentaire
        // Attention a bien utilisé un nom d'autheur définit dans la db pendant la creation des articles
        const article = await Article.findById(query)

        // On définit notre construction de Commentaire
        const comment = new Comment({
            content: req.body.content,
            articleID: article._id,
            author: req.session.lastname + ' ' + req.session.firstname,
            avatar: req.session.avatar,
            dateCreate: new Date()
        })

        // Ici on incrémente nos commentaire dans nos model en relation
        article.comment.push(comment._id)

        // On sauvegarde nos modification
        comment.save((err) => {
            if (err) {
                req.flash('error', 'Une erreur est survenue !')
                req.session.error = req.flash('error')
                res.redirect(`/article/${article._id}`)
            }
        })

        article.save((err) => {
            if (err) {
                req.flash('error', 'Une erreur est survenue !')
                req.session.error = req.flash('error')
                res.redirect(`/article/${article._id}`)
            }

        })

        // Message en cas de success
        req.flash('success', 'Le commentaire est désormais en ligne !')
        req.session.success = req.flash('success')
        res.redirect(`/article/${article._id}`)

    }
}