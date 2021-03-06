/*
 * Import Module
 ****************/
const User = require('../../database/models/users'),
    nodemailer = require('nodemailer'),
    fs = require('fs'),
    handlebars = require('handlebars'),
    templateRecoverPass = require('../../template/templateRecoverPassword'),
    templateNewUser = require('../../template/templateNewUser'),
    templateContact = require('../../template/templateContact')


require('dotenv').config() // Package de configuration sécurisé pour le portfolio


// Récupere et on parse le fichier html
const readHTMLFile = function(path, callback) {
    fs.readFile(path, { encoding: 'utf-8' }, function(err, html) {
        if (err) {
            throw err
            callback(err)
        } else {
            callback(null, html)
        }
    })
}

// Déclaration de notre transporter
// C'est en quelque sorte notre connexion à notre boite mail
transporter = nodemailer.createTransport({
    host: "smtp-fr.securemail.pro",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER_MAILER, // Env utilisateur
        pass: process.env.PASSWORD_MAILER, // Env password
    }
})


/*
 * Controller
 *************/
module.exports = {

    captcha: (req, res) => {

        req.flash('error', 'Merci de valider le captcha !')
        req.session.error = req.flash('error')
        res.redirect('/')

    },

    // Action test boite mail > nodemailer
    contact: (req, res) => {

        const mail = {
            'email': req.body.email,
            'sujet': req.body.sujet,
            'content': req.body.content
        }

        // On déclare une constante (Template de l'email)
        templateContact(mail)

        // On configure notre mail à envoyer par nodemailer
        const mailOptions = templateContact(mail)

        // On demande à notre transporter d'envoyer notre mail
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err)
            else {
                req.flash('success', 'Votre message a bien été envoyer')
                req.session.success = req.flash('success')
                res.redirect('/')
            }
        })
    },

    // Methode Register users
    register: async(req, res) => {

        const image = req.file.originalname // Déclaration constante image

        // Condition pour vérifier la longueur du mot passe
        if (req.body.password.length > 9) {

            User
                .create({
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: `/images/avatar/${image}`,
                    name: image,
                }, (err) => {
                    if (err) {
                        req.flash('error', 'L\'adresse email éxiste déjà ! Ou une erreur est survenue !')
                        req.session.error = req.flash('error')
                        req.session.data1 = req.body.email
                        req.session.data2 = req.body.lastname
                        req.session.data3 = req.body.firstname
                        res.redirect('/') // Rediriger si erreur
                    } else {
                        // Message de success
                        req.flash('success', 'Merci de votre inscription !')
                        req.session.success = req.flash('success')

                        const user = req.body.email

                        // On déclare une constante (Template de l'email)
                        templateNewUser(user)
                        const mailOptions = templateNewUser(user)

                        // On demande à notre transporter d'envoyer notre mail
                        transporter.sendMail(mailOptions, (err, info) => {
                            if (err) console.log(err)
                            else {
                                req.flash('success', 'Un e-mail vient de vous être envoyé sur ' + user + ' !')
                                req.session.success = req.flash('success')
                                res.redirect('/')
                            }
                        })
                    }
                })

        } else {
            // Message d'erreur et on save les datas dans une session pour eviter à l'utilisateur de retaper c'est données
            req.flash('error', 'Le mot de passe doit contenir minimums 8 caractères !')
            req.session.error = req.flash('error')
            req.session.data1 = req.body.email
            req.session.data2 = req.body.lastname
            req.session.data3 = req.body.firstname
            res.redirect('/') // Et on redirige sur l'accueil
        }



    },

    // Methode mot de passe oublié
    forgot_password: (req, res) => {

        // On recherche l'utilisateur dans la base donnée
        User.findOne({ 'email': req.body.email }, (err, user) => {

            //Check if email exists in the database
            if (!user) {
                req.flash('error', "Cette adresse email n'existe pas ! ")
                req.session.error = req.flash('error')
                res.redirect('/')
            } else {

                // On enregistre le token et l'email dans la session
                req.session.token = user.token
                req.session.email = user.email

                // On déclare une constante (Template de l'email)
                templateRecoverPass(user)
                const mailOptions = templateRecoverPass(user)

                // On demande à notre transporter d'envoyer notre mail
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) console.log(err)
                    else {
                        req.flash('success', 'Un e-mail vient de vous être envoyé sur ' + user.email + ' !')
                        req.session.success = req.flash('success')
                        res.redirect('/')
                    }
                })
            }
        })
    }

}