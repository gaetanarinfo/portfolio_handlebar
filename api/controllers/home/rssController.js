const RSS = require('rss'),
    Article = require('../../database/models/articles')

var feed = new RSS({
    title: 'Mon flux rss de mon portfolio',
    description: 'Mon super flux rss de mon portfolio',
    url: 'https://gaetan-seigneur.website/rss',
    generator: 'Portfolio v1.0.0',
    webMaster: 'Gaëtan Seigneur',
    copyright: 'Gaëtan Seigneur - Portfolio 2021',
    language: 'FR | EN',
    categories: ['Informatique', 'Développement']
});

/*
 * Controller
 *************/
module.exports = {

    getRss: async(req, res) => {
        Article
            .find({})
            .exec((err, articlesResult) => {
                articlesResult.forEach(article => {
                    feed.item({
                        title: article.title,
                        author: article.author,
                        date: article.dateCreate,
                        description: article.content,
                        url: 'https://gaetan-seigneur.website/article/' + article._id,
                        image_url: 'https://gaetan-seigneur.website/images/article/' + article.image
                    })
                })

                var xml = feed.xml()

                res.type('application/xml').send(xml)
            })
    },

}