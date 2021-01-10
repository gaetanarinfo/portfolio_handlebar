module.exports = {
    // Method Get
    get: (req, res) => {
        if (req.session.isAdmin == true) {
            res.render('admin', { layout: 'admin', title: 'Administration de mon blog', content: 'Portfolio de Gaëtan Seigneur' })
        } else {
            res.redirect('/')
        }
    }
}