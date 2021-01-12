const User = require('../../database/models/users'),
    bcrypt = require('bcrypt')

/*
 * Controller
 *************/
module.exports = {

    // Method auth
    auth: (req, res) => {
        const { email, password } = req.body;

        User.findOne({ email }, (error, user) => {
            if (user) {

                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {

                        // Récupère le membres dans une session
                        req.session.userId = user._id
                        req.session.lastname = user.lastname
                        req.session.firstname = user.firstname
                        req.session.avatar = user.avatar
                        req.session.isAdmin = user.isAdmin

                        if (req.session.isAdmin == true) {
                            req.flash('success', 'Connexion réussie !')
                            req.session.success = req.flash('success')

                            res.redirect('/')
                        } else {
                            req.flash('success', 'Connexion réussie !')
                            req.session.success = req.flash('success')

                            res.redirect('/')
                        }

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

        setTimeout(() => {

            res.redirect('/')
            req.session.destroy()

        }, 1000);
    }
}