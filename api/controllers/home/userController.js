const User = require('../../database/models/users'),
    bcrypt = require('bcrypt');

/*
 * Controller
 *************/
module.exports = {

    // Method post
    register: (req, res) => {

        //Upload File
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).res.flash('error', 'Le fichier ne doit pas être vide !'), res.session.error = req.flash('error')

        }

        const avatarFile = req.files.avatar;

        if (avatarFile.size < 1048576) {

            if (req.body.password.length > 9) {

                avatarFile.mv('public/avatar/' + avatarFile.name, function(err) {
                    if (err) {
                        req.session.error = req.flash('error')
                        req.session.data1 = req.body.email
                        req.session.data2 = req.body.lastname
                        req.session.data3 = req.body.firstname
                        req.session.data4 = avatarFile.name
                        return res.status(500).res.flash('error', 'Une erreur est survenue !'), res.session.error = req.flash('error');
                    } else {

                        User
                            .create({
                                firstname: req.body.firstname,
                                lastname: req.body.lastname,
                                email: req.body.email,
                                password: req.body.password,
                                avatar: avatarFile.name
                            }, (err) => {
                                if (err) {
                                    console.log(err)
                                    req.flash('error', 'Une erreur est survenue !')
                                    req.session.error = req.flash('error')
                                    req.session.error = req.flash('error')
                                    req.session.data1 = req.body.email
                                    req.session.data2 = req.body.lastname
                                    req.session.data3 = req.body.firstname
                                    req.session.data4 = avatarFile.name
                                    res.redirect('/')
                                } else {
                                    req.flash('success', 'Merci de votre inscription !')
                                    req.session.success = req.flash('success')
                                    res.redirect('/')
                                }

                            })
                    }
                })

            } else {
                req.flash('error', 'Le mot de passe doit contenir minimums 8 caractères')
                req.session.error = req.flash('error')
                req.session.data1 = req.body.email
                req.session.data2 = req.body.lastname
                req.session.data3 = req.body.firstname
                req.session.data4 = avatarFile.name
                res.redirect('/')
            }

        } else {
            req.flash('error', 'Désolé le fichier est trop volumineux !')
            req.session.error = req.flash('error')
            res.redirect('/')
        }

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