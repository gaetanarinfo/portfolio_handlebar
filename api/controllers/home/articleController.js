const Post = require('../../database/models/articles');
const Comment = require('../../database/models/comments');

/*
 * Controller
 *************/
module.exports = {
    // Method Get

    get: async(req, res) => {
        const article = await Post.findById(req.params.id).lean() // Récupère l'article
        const commentAll = await Comment.find({ _articleid: req.params.id }).lean(); // Récupère les commentaires
        const countComment = await Comment.countDocuments({ _articleid: req.params.id }).lean(); // Permet de compter le nombre de commentaire par article

        const success = req.session.success // Message Succes
        const error = req.session.error // Message Error
        req.session.success = ''
        req.session.error = ''

        if (success || error) {
            res.render('article', {
                success: success,
                commentAll,
                title: article.title,
                content: article.content,
                author: article.author,
                dateCreate: article.dateCreate,
                comment: countComment,
                isAdmin: article.isAdmin,
                id: article._id,
            })
        } else {
            res.render('article', {
                error: error,
                commentAll,
                title: article.title,
                content: article.content,
                author: article.author,
                dateCreate: article.dateCreate,
                comment: countComment,
                isAdmin: article.isAdmin,
                id: article._id,
            })
        }
    },

    post: async(req, res) => {

        Post.findById(req.body.articleid, function(err, count) {

            const countNumber = count.comment

            Post.findByIdAndUpdate(req.body.articleid, {
                    comment: (countNumber) + 1,
                },
                (error) => {});
        })

        Comment
            .create({
                _articleid: req.body.articleid,
                author: req.session.lastname + ' ' + req.session.firstname,
                avatar: req.session.avatar,
                dateCreate: new Date(),
                content: req.body.content,
            }, (err) => {
                if (err) {
                    //console.log(err)
                    req.flash('error', 'Une erreur est survenue !')
                    req.session.success = req.flash('error')
                    res.redirect("/article/" + req.body.articleid)
                } else {
                    req.flash('success', 'Le commentaire est désormais en ligne !')
                    req.session.success = req.flash('success')
                    res.redirect("/article/" + req.body.articleid)
                }

            })
    }
}