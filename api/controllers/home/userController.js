const User = require('../../database/models/users');
const bcrypt = require('bcrypt');

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
                            res.redirect('/admin')
                        } else {
                            res.redirect('/')
                        }
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