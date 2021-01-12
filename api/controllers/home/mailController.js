"use strict";
const nodemailer = require("nodemailer")

require('dotenv').config()

/*
 * Controller
 *************/
module.exports = {
    // Method Post
    post: (req, res) => {

        async function main() {

            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true pour 587
                auth: {
                    user: process.env.USER_MAILER, // Env utilisateur
                    pass: process.env.PASSWORD_MAILER, // Env password
                },
            })

            // Envoyer du courrier avec l'objet de transport défini (Soit req.body)
            let info = await transporter.sendMail({
                from: req.body.name + '" " <foo@example.com>',
                to: req.body.email,
                subject: req.body.sujet,
                html: req.body.content,
            });

            //console.log("Message envoyer: %s", info.messageId);
        }

        main().catch(console.error);

        req.flash('success', 'Votre message a bien été envoyer !')
        req.session.success = req.flash('success')
        res.redirect('/')

    }

}