const User = require('../../database/models/users'),
    nodemailer = require('nodemailer'),
    fs = require('fs'),
    handlebars = require('handlebars'),
    path = require('path')

/*
 * On déclare nos constante
 * ************************ */

require('dotenv').config()

// Récupere et transforme le fichier html
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

// Déclaration ne notre transporter
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

var rand, mailOptions, host, link

module.exports = {
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

    register: (req, res) => {

        //Upload File
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).res.flash('error', 'Le fichier ne doit pas être vide !'), res.session.error = req.flash('error')

        }

        const avatarFile = req.files.avatar

        if (avatarFile.size < 1048576) {

            if (req.body.password.length > 9) {

                avatarFile.mv('public/avatar/' + avatarFile.name, function(err) {
                    if (err) {
                        req.session.error = req.flash('error')
                        req.session.data1 = req.body.email
                        req.session.data2 = req.body.lastname
                        req.session.data3 = req.body.firstname
                        req.session.data4 = avatarFile.name
                        return res.status(500).res.flash('error', 'Une erreur est survenue !'), res.session.error = req.flash('error')
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
                                    //console.log(err)
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


                                    readHTMLFile('email.html', function(err, html) {

                                        async function main() {

                                            var template = handlebars.compile(html)

                                            let transporter = nodemailer.createTransport({
                                                host: "smtp.gmail.com",
                                                port: 587,
                                                secure: false,
                                                auth: {
                                                    user: process.env.USER_MAILER, // Env utilisateur
                                                    pass: process.env.PASSWORD_MAILER, // Env password
                                                },
                                            })

                                            // Envoyer du courrier avec l'objet de transport défini (Soit req.body)
                                            let info = await transporter.sendMail({
                                                from: '"Seigneur Gaëtan Portfolio - " <gaetanarinfo@gmail.com>',
                                                to: req.body.email,
                                                subject: "Inscription sur mon Portfolio",
                                                html: html,
                                            })

                                            //console.log("Message envoyer: %s", info.messageId)

                                        }

                                        main().catch(console.error)

                                    })

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

    forgot_password: (req, res) => {

        User.findOne({ 'email': req.body.email }, (err, user) => {
                if (err) return res.status(400).json({ message: 'There was an error processing your request. Please try again.' });

                //Check if email exists in the database
                if (!user) {
                    return res.status(400).json({ message: 'No User found with that email.' });
                } else {

                    console.log(req.body.email);


                    const hostname = (process.env.NODE_ENV === 'production' ? req.hostname : `http://localhost:${config.PORT}`)


                    const mailOptions = {
                        to: `${user.email}`,
                        from: 'Mayorga Dev <me@alexmayorga.dev>',
                        subject: 'Password Reset',
                        text: `Hi ${user.firstname}, Please use this link to reset your password: ${hostname}/reset-password/test`,
                        html: `
                            Hi ${user.firstname}, Please use this link to reset your password:
                            <br><br>
                            <a 
                                style="padding:6px 12px; background-color:#7557B9;color: #fff;border-radius:6px;display: inline-block;text-decoration:none" 
                                href="${hostname}/reset-password/test">Reset Token</a>
                        `,
                    };

                    // On demande à notre transporter d'envoyer notre mail
                    transporter.sendMail(mailOptions, (err, info) => {
                        if (err) console.log(err)
                        else {
                            req.flash('success', '' + user.email + ' !')
                            req.session.success = req.flash('success')
                            res.redirect('/')
                        }
                    })
                }
            }) //EOF findOne()
    }

}