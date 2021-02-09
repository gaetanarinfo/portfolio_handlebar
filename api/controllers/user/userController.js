/*
 * Import Module
 ****************/
const User = require('../../database/models/users'),
    bcrypt = require('bcrypt'),
    extIP = require("ext-ip")();

/*
 * Controller
 *************/
module.exports = {

    // Method auth pour la connexion
    auth: (req, res) => {

        const { email, password } = req.body;

        // On recherche l'utilisateur
        User.findOne({ email }, (error, user) => {
            if (user) {

                // On décrypte le mot de passe et on le compare avec l'utilisateur
                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {

                        // Récupère les informations du membre et les stock dans la session
                        req.session.userId = user._id
                        req.session.lastname = user.lastname
                        req.session.firstname = user.firstname
                        req.session.email = user.email
                        req.session.avatar = user.avatar
                        req.session.isAdmin = user.isAdmin
                        req.session.isLog = user.isLog
                        req.session.ip = user.ip

                        // On récupere l'ip de l'utilisateur pour la stocker
                        extIP.get((err, ip) => {
                            if (err) {
                                console.error("callback error: " + err);
                            } else {

                                // On met à jour l'ip dans la BDD
                                User.findOneAndUpdate({ '_id': user.id }, {
                                    isLog: new Date(),
                                    ip: ip
                                }, (error) => {});

                            }
                        })

                        // Message en cas de success
                        req.flash('success', 'Connexion réussie !')
                        req.session.success = req.flash('success')

                        res.redirect('/')

                    } else {

                        // Message en cas d'erreur
                        req.flash('error', 'Une erreur est survenue !')
                        req.session.error = req.flash('error')
                        res.redirect('/')
                    }
                })

            } else {

                // Message en cas d'erreur
                req.flash('error', "Erreur l'email ou le mot de passe n'est pas correct !")
                req.session.error = req.flash('error')
                res.redirect('/')
            }
        })
    },

    // Method logout pour la déconnexion
    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/')
    }
}