const User = require('../../database/models/users'),
    nodemailer = require('nodemailer'),
    fs = require('fs'),
    handlebars = require('handlebars')

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
                        return res.redirect('/')
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
                req.flash('error', 'Le mot de passe doit contenir minimums 8 caractères !')
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

                //Check if email exists in the database
                if (!user) {
                    req.flash('error', "Cette adresse email n'existe pas ! ")
                    req.session.error = req.flash('error')
                    res.redirect('/')
                } else {

                    req.session.token = user.token
                    req.session.email = user.email

                    const mailOptions = {
                        to: `${user.email}`,
                        from: 'Seigneur Gaëtan <gaetanarinfo@gmail.com>',
                        subject: 'Portfolio Mot de passe oublié',
                        html: `<html
                        style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
                    
                    <head>
                        <meta charset="UTF-8">
                        <meta content="width=device-width, initial-scale=1" name="viewport">
                        <meta name="x-apple-disable-message-reformatting">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta content="telephone=no" name="format-detection">
                        <title>Nouveau modèle de courrier électronique 2021-01-12</title>
                        <!--[if (mso 16)]>
                        <style type="text/css">
                        a {text-decoration: none;}
                        </style>
                        <![endif]-->
                        <!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]-->
                        <!--[if gte mso 9]>
                    <xml>
                        <o:OfficeDocumentSettings>
                        <o:AllowPNG></o:AllowPNG>
                        <o:PixelsPerInch>96</o:PixelsPerInch>
                        </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
                        <style type="text/css">
                            #outlook a {
                                padding: 0;
                            }
                    
                            .ExternalClass {
                                width: 100%;
                            }
                    
                            .ExternalClass,
                            .ExternalClass p,
                            .ExternalClass span,
                            .ExternalClass font,
                            .ExternalClass td,
                            .ExternalClass div {
                                line-height: 100%;
                            }
                    
                            .es-button {
                                mso-style-priority: 100 !important;
                                text-decoration: none !important;
                            }
                    
                            a[x-apple-data-detectors] {
                                color: inherit !important;
                                text-decoration: none !important;
                                font-size: inherit !important;
                                font-family: inherit !important;
                                font-weight: inherit !important;
                                line-height: inherit !important;
                            }
                    
                            .es-desk-hidden {
                                display: none;
                                float: left;
                                overflow: hidden;
                                width: 0;
                                max-height: 0;
                                line-height: 0;
                                mso-hide: all;
                            }
                    
                            @media only screen and (max-width:600px) {
                    
                                p,
                                ul li,
                                ol li,
                                a {
                                    font-size: 16px !important;
                                    line-height: 150% !important
                                }
                    
                                h1 {
                                    font-size: 30px !important;
                                    text-align: center;
                                    line-height: 120% !important
                                }
                    
                                h2 {
                                    font-size: 26px !important;
                                    text-align: center;
                                    line-height: 120% !important
                                }
                    
                                h3 {
                                    font-size: 20px !important;
                                    text-align: center;
                                    line-height: 120% !important
                                }
                    
                                h1 a {
                                    font-size: 30px !important
                                }
                    
                                h2 a {
                                    font-size: 26px !important
                                }
                    
                                h3 a {
                                    font-size: 20px !important;
                                    text-align: center
                                }
                    
                                .es-menu td a {
                                    font-size: 16px !important
                                }
                    
                                .es-header-body p,
                                .es-header-body ul li,
                                .es-header-body ol li,
                                .es-header-body a {
                                    font-size: 16px !important
                                }
                    
                                .es-footer-body p,
                                .es-footer-body ul li,
                                .es-footer-body ol li,
                                .es-footer-body a {
                                    font-size: 16px !important
                                }
                    
                                .es-infoblock p,
                                .es-infoblock ul li,
                                .es-infoblock ol li,
                                .es-infoblock a {
                                    font-size: 12px !important
                                }
                    
                                *[class="gmail-fix"] {
                                    display: none !important
                                }
                    
                                .es-m-txt-c,
                                .es-m-txt-c h1,
                                .es-m-txt-c h2,
                                .es-m-txt-c h3 {
                                    text-align: center !important
                                }
                    
                                .es-m-txt-r,
                                .es-m-txt-r h1,
                                .es-m-txt-r h2,
                                .es-m-txt-r h3 {
                                    text-align: right !important
                                }
                    
                                .es-m-txt-l,
                                .es-m-txt-l h1,
                                .es-m-txt-l h2,
                                .es-m-txt-l h3 {
                                    text-align: left !important
                                }
                    
                                .es-m-txt-r img,
                                .es-m-txt-c img,
                                .es-m-txt-l img {
                                    display: inline !important
                                }
                    
                                .es-button-border {
                                    display: block !important
                                }
                    
                                .es-btn-fw {
                                    border-width: 10px 0px !important;
                                    text-align: center !important
                                }
                    
                                .es-adaptive table,
                                .es-btn-fw,
                                .es-btn-fw-brdr,
                                .es-left,
                                .es-right {
                                    width: 100% !important
                                }
                    
                                .es-content table,
                                .es-header table,
                                .es-footer table,
                                .es-content,
                                .es-footer,
                                .es-header {
                                    width: 100% !important;
                                    max-width: 600px !important
                                }
                    
                                .es-adapt-td {
                                    display: block !important;
                                    width: 100% !important
                                }
                    
                                .adapt-img {
                                    width: 100% !important;
                                    height: auto !important
                                }
                    
                                .es-m-p0 {
                                    padding: 0px !important
                                }
                    
                                .es-m-p0r {
                                    padding-right: 0px !important
                                }
                    
                                .es-m-p0l {
                                    padding-left: 0px !important
                                }
                    
                                .es-m-p0t {
                                    padding-top: 0px !important
                                }
                    
                                .es-m-p0b {
                                    padding-bottom: 0 !important
                                }
                    
                                .es-m-p20b {
                                    padding-bottom: 20px !important
                                }
                    
                                .es-mobile-hidden,
                                .es-hidden {
                                    display: none !important
                                }
                    
                                tr.es-desk-hidden,
                                td.es-desk-hidden,
                                table.es-desk-hidden {
                                    width: auto !important;
                                    overflow: visible !important;
                                    float: none !important;
                                    max-height: inherit !important;
                                    line-height: inherit !important
                                }
                    
                                tr.es-desk-hidden {
                                    display: table-row !important
                                }
                    
                                table.es-desk-hidden {
                                    display: table !important
                                }
                    
                                td.es-desk-menu-hidden {
                                    display: table-cell !important
                                }
                    
                                .es-menu td {
                                    width: 1% !important
                                }
                    
                                table.es-table-not-adapt,
                                .esd-block-html table {
                                    width: auto !important
                                }
                    
                                table.es-social {
                                    display: inline-block !important
                                }
                    
                                table.es-social td {
                                    display: inline-block !important
                                }
                    
                                a.es-button,
                                button.es-button {
                                    font-size: 20px !important;
                                    display: block !important;
                                    border-width: 10px 20px 10px 20px !important
                                }
                            }
                        </style>
                    </head>
                    
                    <body
                        style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
                        <div class="es-wrapper-color" style="background-color:#EFEFEF">
                            <!--[if gte mso 9]>
                                <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
                                    <v:fill type="tile" color="#efefef"></v:fill>
                                </v:background>
                            <![endif]-->
                            <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0"
                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top">
                                <tbody>
                                    <tr style="border-collapse:collapse">
                                        <td valign="top" style="padding:0;Margin:0">
                                            <table cellpadding="0" cellspacing="0" class="es-header" align="center"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                                                <tbody>
                                                    <tr style="border-collapse:collapse">
                                                        <td align="center" style="padding:0;Margin:0">
                                                            <table class="es-header-body" cellspacing="0" cellpadding="0" align="center"
                                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#E6EBEF;width:600px">
                                                                <tbody>
                                                                    <tr style="border-collapse:collapse">
                                                                        <td align="left" style="padding:20px;Margin:0">
                                                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                                <tbody>
                                                                                    <tr style="border-collapse:collapse">
                                                                                        <td valign="top" align="center"
                                                                                            style="padding:0;Margin:0;width:560px">
                                                                                            <table width="100%" cellspacing="0"
                                                                                                cellpadding="0" role="presentation"
                                                                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                                                <tbody>
                                                                                                    <tr style="border-collapse:collapse">
                                                                                                        <td align="center"
                                                                                                            style="padding:0;Margin:0;font-size:0px">
                                                                                                            <a href="https://gaetan-seigneur.website"
                                                                                                                target="_blank"
                                                                                                                style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#677D9E"><img
                                                                                                                    src="https://okmzxs.stripocdn.email/content/guids/CABINET_db5a98caf16c91a06a9c410ea8f367ac/images/94381610456765817.png"
                                                                                                                    alt="Portfolio Gaëtan"
                                                                                                                    title="Portfolio Gaëtan"
                                                                                                                    width="134"
                                                                                                                    style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                    
                                            <table cellpadding="0" cellspacing="0" class="es-header" align="center"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                                                <tbody>
                                                    <tr style="border-collapse:collapse">
                                                        <td align="center" style="padding:0;Margin:0">
                                                            <table class="es-header-body" cellspacing="0" cellpadding="0" align="center"
                                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#E6EBEF;width:600px">
                                                                <tbody>
                                                                    <tr style="border-collapse:collapse">
                                                                        <td align="left" style="padding:20px;Margin:0">
                                                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                                <tbody>
                                                                                    <tr style="border-collapse:collapse">
                                                                                        <td valign="top" align="center"
                                                                                            style="padding:0;Margin:0;width:560px">
                                                                                            <table width="100%" cellspacing="0"
                                                                                                cellpadding="0" role="presentation"
                                                                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                                                <tbody>
                                                                                                    <tr style="border-collapse:collapse">
                                                                                                        <td align="center"
                                                                                                            style="padding:0;Margin:0;font-size:13px">
                                                                                                                    Bonjour ${user.firstname} ${user.lastname}, veuillez utiliser ce lien pour réinitialiser
                                                                                                                    votre mot de passe :
                                                                                                                    <br><br>
                                                                                                                    <a style="padding: 7px 16px;background-color: #317b13;color: #fff;border-radius: 6px;display: inline-block;text-decoration: none;font-size: 13px;font-weight: 600;letter-spacing: 1px;"
                                                                                                                        href="https://gaetan-seigneur.website/reset-password/${user.token}">Confirmer</a>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <table cellpadding="0" cellspacing="0" class="es-footer" align="center"
                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
                                                <tbody>
                                                    <tr style="border-collapse:collapse">
                                                        <td align="center" style="padding:0;Margin:0">
                                                            <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center"
                                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#E6EBEF;width:600px">
                                                                <tbody>
                                                                    <tr style="border-collapse:collapse">
                                                                        <td align="left"
                                                                            style="Margin:0;padding-top:0;padding-bottom:20px;padding-left:20px;padding-right:20px">
                                                                            <table width="100%" cellspacing="0" cellpadding="0"
                                                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                                <tbody>
                                                                                    <tr style="border-collapse:collapse">
                                                                                        <td valign="top" align="center"
                                                                                            style="padding:0;Margin:0;width:560px">
                                                                                            <table width="100%" cellspacing="0"
                                                                                                cellpadding="0" role="presentation"
                                                                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                                                <tbody>
                                                                                                    <tr style="border-collapse:collapse">
                                                                                                        <td align="center"
                                                                                                            style="padding:0;Margin:0;padding-top:15px;font-size:0px">
                                                                                                            <table
                                                                                                                class="es-table-not-adapt es-social"
                                                                                                                cellspacing="0"
                                                                                                                cellpadding="0"
                                                                                                                role="presentation"
                                                                                                                style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                                                                                                <tbody>
                                                                                                                    <tr
                                                                                                                        style="border-collapse:collapse">
                                                                                                                        <td valign="top"
                                                                                                                            align="center"
                                                                                                                            style="padding:0;Margin:0;padding-right:10px">
                                                                                                                            <img title="Facebook"
                                                                                                                                src="https://okmzxs.stripocdn.email/content/assets/img/social-icons/circle-colored/facebook-circle-colored.png"
                                                                                                                                alt="Fb"
                                                                                                                                width="32"
                                                                                                                                style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                                                                                                        </td>
                                                                                                                        <td valign="top"
                                                                                                                            align="center"
                                                                                                                            style="padding:0;Margin:0;padding-right:10px">
                                                                                                                            <img title="Twitter"
                                                                                                                                src="https://okmzxs.stripocdn.email/content/assets/img/social-icons/circle-colored/twitter-circle-colored.png"
                                                                                                                                alt="Tw"
                                                                                                                                width="32"
                                                                                                                                style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                                                                                                        </td>
                                                                                                                        <td valign="top"
                                                                                                                            align="center"
                                                                                                                            style="padding:0;Margin:0;padding-right:10px">
                                                                                                                            <img title="Instagram"
                                                                                                                                src="https://okmzxs.stripocdn.email/content/assets/img/social-icons/circle-colored/instagram-circle-colored.png"
                                                                                                                                alt="Inst"
                                                                                                                                width="32"
                                                                                                                                style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                                                                                                        </td>
                                                                                                                        <td valign="top"
                                                                                                                            align="center"
                                                                                                                            style="padding:0;Margin:0;padding-right:10px">
                                                                                                                            <img title="Youtube"
                                                                                                                                src="https://okmzxs.stripocdn.email/content/assets/img/social-icons/circle-colored/youtube-circle-colored.png"
                                                                                                                                alt="Yt"
                                                                                                                                width="32"
                                                                                                                                style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr style="border-collapse:collapse">
                                                                                                        <td align="center"
                                                                                                            style="Margin:0;padding-bottom:10px;padding-top:15px;padding-left:15px;padding-right:15px">
                                                                                                            <p
                                                                                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:13px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:20px;color:#333333">
                                                                                                                Vous recevez cet e-mail
                                                                                                                parce que vous avez visité
                                                                                                                notre site ou vous vous êtes
                                                                                                                inscrits.</p>
                                                                                                            <p
                                                                                                                style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-size:14px;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333">
                                                                                                                Design de cet e-mail par <a
                                                                                                                    target="_blank"
                                                                                                                    style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;font-size:14px;text-decoration:underline;color:#2E3951"
                                                                                                                    href="https://gaetan.store">Gaëtan
                                                                                                                    Seigneur</a></p>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="banner-toolbar"></div>
                    
                    
                    </body>
                    
                    </html>`,
                    };

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
            }) //EOF findOne()
    }

}