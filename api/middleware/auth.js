const User = require('../database/models/users');

module.exports = (req, res, next) => {

    // Connexion base de donnée
    User.findById(req.session.userId, (error, user) => {

        const isAdmin = req.session.isAdmin

        if (error || !user || isAdmin != true) {
            return res.redirect('/')
        }

        next()
    })

}