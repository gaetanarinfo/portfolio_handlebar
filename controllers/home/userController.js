const User = require('../../database/models/users');

/*
 * Controller
 *************/
module.exports = {
    // Method post
    post: (req, res) => {
        User
            .create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password
            }, (err) => {
                if (err) console.log(err)

                req.flash('success', 'Merci d avoir entrer un titre')
                req.session.success = req.flash('success')
                res.redirect('/')

            })

    }
}