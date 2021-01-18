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
        const query = req.params.id,
            // Ici on recherche l'article ayant comme id le query de notre URL   
            dbArticleID = await Article.findById(query)
        countComment = await Comment.countDocuments(query).lean();

        // Ici nous resortons notre constructeur
        Article
        // Nous recherchons une article ayant le meme ID que notre req.params.id
            .findById(query)
            // Nous utilisons populate afin de ressortir les datas des models en relation avec notre constructeur principal
            .populate('comment')
            .lean()

        // Nous executons nous recherche
        .exec((err, result) => {
            // Si il y une erreur on la log grace à handleError
            if (err) {
                req.flash('error', 'Une erreur est survenue !')
                req.session.error = req.flash('error')
                res.redirect("/article/" + req.body.articleid)
            };

            // Petit check
            //console.log('Populate Exec')

            // Et on renvoie notre page avec les data
            if (success || error) {
                res.render('article', {
                    success: success,
                    artID: result,
                    commentAll: result.comment
                })
            } else {
                res.render('article', {
                    error: error,
                    success: success,
                    artID: result,
                    commentAll: result.comment,
                    countComments: countComment
                })
            }
        })

        // const article = await Article.findById(req.params.id).lean() // Récupère l'article
        // const countComment = await Comment.countDocuments({ _articleid: req.params.id }).lean(); // Permet de compter le nombre de commentaire par article

        // const success = req.session.success // Message Succes
        // const error = req.session.error // Message Error
        // req.session.success = ''
        // req.session.error = ''

        // if (success || error) {
        //     res.render('article', {
        //         success: success,
        //         title: article.title,
        //         content: article.content,
        //         author: article.author,
        //         image: article.image,
        //         avatar: article.avatar,
        //         dateCreate: article.dateCreate,
        //         comment: countComment,
        //         id: article._id,
        //     })
        // } else {
        //     res.render('article', {
        //         error: error,
        //         title: article.title,
        //         content: article.content,
        //         author: article.author,
        //         image: article.image,
        //         avatar: article.avatar,
        //         dateCreate: article.dateCreate,
        //         comment: countComment,
        //         id: article._id,
        //     })
        // }
    },

    post: async(req, res) => {


        // Permet de compter le nombre de comentaire
        // Article.findById(req.body.articleid, function(err, count) {

        //     const countNumber = count.comment

        //     Post.findByIdAndUpdate(req.body.articleid, {
        //             comment: (countNumber) + 1,
        //         },
        //         (error) => {});
        // })

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

        // Et on redirige sur notre article parent
        res.redirect(`/article/${article._id}`)

    }
}