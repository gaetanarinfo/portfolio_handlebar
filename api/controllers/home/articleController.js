/*
 * Controller
 *************/
module.exports = {
    // Method Get
    get: (req, res) => {
        res.render('article', { title: 'Article de mon blog' })
    }
}