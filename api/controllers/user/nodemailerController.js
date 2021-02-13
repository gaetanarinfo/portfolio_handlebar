/*
 * Import Module
 ****************/
const User = require('../../database/models/users'),
    nodemailer = require('nodemailer'),
    fs = require('fs'),
    handlebars = require('handlebars'),
    templateRecoverPass = require('../../template/templateRecoverPassword')


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
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
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
        //console.log(req.body)
        // On configure notre mail à envoyer par nodemailer
        const mailOptions = {
            from: req.body.name + '" " <gaetanarinfo@gmail.com>',
            to: req.body.email,
            subject: req.body.sujet,
            html: req.body.content
        }

        // On demande à notre transporter d'envoyer notre mail
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) console.log(err)
            else {
                req.flash('success', 'Votre message a bien été envoyer sur ' + req.body.email + ' !')
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

                        // On lie le fichier email
                        readHTMLFile('email.html', function(err, html) {

                            // Methode asyncrone function main
                            async function main() {

                                var template = handlebars.compile(html) // On compile la template email

                                // On crée une constante transporter
                                let transporter = nodemailer.createTransport({
                                    host: "smtp.gmail.com",
                                    port: 587,
                                    secure: false,
                                    auth: {
                                        user: process.env.USER_MAILER, // Config Env users
                                        pass: process.env.PASSWORD_MAILER, // Config Env password
                                    },
                                })

                                // Envoyer du courrier avec l'objet de transport défini (Soit req.body)
                                let info = await transporter.sendMail({
                                    from: '"Seigneur Gaëtan Portfolio - " <gaetanarinfo@gmail.com>',
                                    to: req.body.email,
                                    subject: "Inscription sur mon Portfolio",
                                    html: html,
                                })

                            }

                            main().catch() // On vérifie si il n'y à pas d'erreur

                        })

                        res.redirect('/') // On redirige vers l'accueil
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