/*
 * Controller
 *************/
module.exports = {
    // Method get
    get: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/')
        })
    }
}