const User = require('../../database/models/users'),
    bcrypt = require('bcrypt'),
    extIP = require("ext-ip")();

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
                        req.session.email = user.email
                        req.session.avatar = user.avatar
                        req.session.isAdmin = user.isAdmin
                        req.session.isLog = user.isLog
                        req.session.ip = user.ip

                        req.session.gaet = user

                        extIP.get((err, ip) => {
                            if (err) {
                                console.error("callback error: " + err);
                            } else {


                                User.findOneAndUpdate({ '_id': user.id }, {
                                    isLog: new Date(),
                                    ip: ip
                                }, (error) => {});

                            }
                        })

                        req.flash('success', 'Connexion réussie !')
                        req.session.success = req.flash('success')

                        res.redirect('/')

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

        req.session.destroy()
        res.redirect('/')
    }
}