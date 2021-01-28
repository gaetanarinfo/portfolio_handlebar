const Article = require('../../database/models/articles');
const Comment = require('../../database/models/comments');

/*
 * Controller
 *************/
module.exports = {
    // Method Get

    get: async(req, res) => {

        const success = req.session.success // Message Succes
        const error = req.session.error // Message Error

        req.session.success = ''
        req.session.error = ''

        // On viens definir nos constante
        // Ici query est égale à l'id envoyer via l'URL /article/:id
        const query = req.params.id

        if (!query) res.redirect('/')

        // Ici nous resortons notre constructeur
        Article
        // Nous recherchons une article ayant le meme ID que notre req.params.id
            .findById(query)
            // Nous utilisons populate afin de ressortir les datas des models en relation avec notre constructeur principal
            .populate('comment')
            .lean()

        // Nous executons nous recherche
        .exec((err, result) => {
            if (!result) {
                res.redirect("/")
            } else {

                if (err) {
                    req.flash('error', 'Une erreur est survenue !')
                    req.session.error = req.flash('error')
                    res.redirect("/article/" + req.body.articleid)
                };

                if (success || error) {
                    res.render('article', {
                        success: success,
                        artID: result
                    })
                } else {
                    res.render('article', {
                        error: error,
                        success: success,
                        artID: result
                    })
                }

            }

        })
    },

    post: async(req, res) => {

        Comment

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

        // On sauvegarde nous modification
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

        req.flash('success', 'Le commentaire est désormais en ligne !')
        req.session.success = req.flash('success')
        res.redirect(`/article/${article._id}`)

    }
}