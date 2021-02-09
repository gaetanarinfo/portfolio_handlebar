/*
 * Import Module
 ****************/
const User = require('../../database/models/users'),
    bcrypt = require('bcrypt'),
    randtoken = require('rand-token')

/*
 * Controller
 *************/
module.exports = {

    // Methode get on envoie les données sur la page
    get: (req, res) => {

        const token = req.session.token,
            email = req.session.email;

        const success = req.session.success // Message Succes
        const error = req.session.error // Message Error

        req.session.success = undefined // Définie le cookie de message success
        req.session.error = undefined // Définie le cookie de message error

        // Si la clé token et l'adresse email est vide on redirige vers l'accueil
        if (token == '' || email == '') {

            res.redirect('/')

        } else {

            // On recherche la clé token dans le model users
            User.findOne({ 'token': req.session.token, 'email': req.session.email }, (err, user) => {

                // Si erreur on redirige vers l'accueil
                if (err) return res.redirect('/')

                // On compare dans la BDD le token et l'email dans l'input 
                if (token != user.token, email != user.email) {

                    res.redirect('/')

                } else {

                    res.render('reset-password', { token: token, success: success, error: error })

                }

            })


        }
    },

    // Methode post pour réinitialiser un nouveau mot de passe
    post: (req, res) => {

        // Déclaration des constantes
        const token = req.session.token,
            email = req.session.email,
            password = req.body.password,
            password_confirm = req.body.password_confirm

        // On recherche l'utilisateur dans la BDD
        User.findOne({ 'token': token, 'email': email }, (err, user) => {
            if (err) return res.redirect('/') // Si erreur on redirige

            // On compare la mot de passe (Si il fait plus de 9 caractères)
            if (password.length > 9) {

                // On comparant les 2 mots de passe
                if (password == password_confirm) {

                    // On crypt le mot de passe
                    bcrypt.hash(req.body.password, 10, (error, encrypted) => {
                        User.findOneAndUpdate({ 'token': token, 'email': email }, {
                            password: encrypted,
                            token: randtoken.generate(30)
                        }, (error) => {});
                    })

                    // On vide les sessions
                    req.session.token = ''
                    req.session.email = ''

                    // Message en cas de success
                    req.flash('success', 'Le mot de passe à été changé !')
                    req.session.success = req.flash('success')
                    res.redirect('/')

                } else {
                    // Message en cas d'erreur
                    req.flash('error', 'Les mots de passe ne correspondant pas !')
                    req.session.error = req.flash('error')
                    res.redirect('/reset-password/' + token)
                }
            } else {
                // Message en cas d'erreur
                req.flash('error', 'Le mot de passe doit contenir minimums 8 caractères !')
                req.session.error = req.flash('error')
                res.redirect('/reset-password/' + token)
            }

        })
    }
}