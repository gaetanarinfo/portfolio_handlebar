const User = require('../database/models/users');

module.exports = (req, res, next) => {

    if (req.session.userId) {
        return res.redirect('/')
    }

    next()

}