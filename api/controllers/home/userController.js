const User = require('../../database/models/users');

/*
 * Controller
 *************/
module.exports = {
    // Method post
    register: (req, res) => {
        User
            .create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: req.body.password
            }, (err) => {
                if (err) {
                    //console.log(err)
                    req.flash('error', 'Une erreur est survenue !')
                    req.session.success = req.flash('error')
                    res.redirect('/')
                } else {
                    req.flash('success', 'Merci de votre inscription !')
                    req.session.success = req.flash('success')
                    res.redirect('/')
                }

            })

    },
    // Method auth
    auth: (req, res) => {
        const { email, password } = req.body;

        console.log(req.body);

        User.findOne({ email }, (error, user) => {
            if (user) {

                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {

                        req.session.userId = user._id

                        res.redirect('/admin')
                        req.flash('success', 'Connexion réussie !')
                        req.session.success = req.flash('success')
                    } else {
                        req.flash('error', 'Une erreur est survenue !')
                        req.session.error = req.flash('error')
                        res.redirect('/')
                    }
                })

            } else {
                req.flash('error', "Erreur l'email ou le mot de passe n'est pas correct !")
                req.session.error = req.flash('error')
                res.redirect('/')
            }
        })
    },
    // Method logout
    logout: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/')
        })
    }
}