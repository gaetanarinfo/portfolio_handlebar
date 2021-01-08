const User = require('../database/models/users');

module.exports = (req, res, next) => {

    // Connexion base de donnée
    User.findById(req.session.userId, (error, user) => {
        if (error || !user) {
            return res.redirect('/')
        }

        next()
    })

}