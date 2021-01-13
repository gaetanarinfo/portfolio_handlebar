const User = require('../../database/models/users'),
    fileupload = require("express-fileupload"),
    express = require('express'),
    app = express()

app.use(fileupload({
    limits: { fileSize: 10 * 1024 * 1024 },
    abortOnLimit: false
}))

module.exports = {

    // Method Get
    get: async(req, res) => {

        const success = req.session.success, // Message Succes
            error = req.session.error // Message Error

        req.session.success = ''
        req.session.error = ''


        if (req.session.isAdmin == true) {

            const email = req.session.email,
                membres = await User.find({}).lean() // Liste des Membres

            User.findOne({ email }, (erro, user) => {

                if (success || error) {
                    res.render('admin', { success: success, error: error, layout: 'admin', title: 'Administration de mon blog', content: "Partie administration de mon portfolio", avatar: user.avatar, name: user.firstname + ' ' + user.lastname, rang: user.isAdmin, dateRegister: user.createDate, membres })
                } else {
                    res.render('admin', { error: error, layout: 'admin', title: 'Administration de mon blog', content: "Partie administration de mon portfolio", avatar: user.avatar, name: user.firstname + ' ' + user.lastname, rang: user.isAdmin, dateRegister: user.createDate, membres })
                }
            })


        } else {
            res.redirect('/')
        }
    },

    addUser: (req, res) => {

        const avatarFile = req.files.avatar

        if (avatarFile.size < 1048576) {

            console.log('ok');

            if (req.body.password.length > 9) {

                console.log('ok2');

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
                                    req.session.data1 = req.body.email
                                    req.session.data2 = req.body.lastname
                                    req.session.data3 = req.body.firstname
                                    req.session.data4 = avatarFile.name

                                    res.redirect('/admin')
                                } else {
                                    req.flash('success', 'Membres inscrits !')
                                    req.session.success = req.flash('success')

                                    res.redirect('/admin')
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
                res.redirect('/admin')
            }

        } else {
            req.flash('error', 'Désolé le fichier est trop volumineux !')
            req.session.error = req.flash('error')
            res.redirect('/admin')
        }

    }
}