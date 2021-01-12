"use strict";
const nodemailer = require("nodemailer")

require('dotenv').config()

// Créer un objet transporteur réutilisable à l'aide du transport SMTP par défaut
module.exports = function(transporter) {

    transporter = async function() {
        return nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true pour 587
            auth: {
                user: process.env.USER_MAILER, // Env utilisateur
                pass: process.env.PASSWORD_MAILER, // Env password
            },
        })
    }
}