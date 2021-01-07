module.exports = {
    // Method Get
    get: (req, res) => {
        res.render('admin', { layout: 'admin', partials: 'admin' })
    }
}