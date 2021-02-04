const User = require('../../database/models/users'),
    bcrypt = require('bcrypt'),
    randtoken = require('rand-token')


module.exports = {

    get: (req, res) => {

        const token = req.session.token;
        const email = req.session.email;

        const success = req.session.success // Message Succes
        const error = req.session.error // Message Error
        req.session.success = undefined
        req.session.error = undefined

        if (token == '' || email == '') {

            res.redirect('/')

        } else {

            User.findOne({ 'token': req.session.token, 'email': req.session.email }, (err, user) => {

                if (err) return res.redirect('/')

                if (token != user.token, email != user.email) {

                    res.redirect('/')

                } else {

                    res.render('reset-password', { token: token, success: success, error: error })


                }

            })


        }
    },
    post: (req, res) => {

        const token = req.session.token,
            email = req.session.email,
            password = req.body.password,
            password_confirm = req.body.password_confirm

        User.findOne({ 'token': token, 'email': email }, (err, user) => {
            if (err) return res.redirect('/')

            if (password.length > 9) {
                if (password == password_confirm) {

                    bcrypt.hash(req.body.password, 10, (error, encrypted) => {
                        User.findOneAndUpdate({ 'token': token, 'email': email }, {
                            password: encrypted,
                            token: randtoken.generate(30)
                        }, (error) => {});
                    })

                    req.session.token = ''
                    req.session.email = ''

                    req.flash('success', 'Le mot de passe à été changé !')
                    req.session.success = req.flash('success')
                    res.redirect('/')

                } else {
                    req.flash('error', 'Les mots de passe ne correspondant pas !')
                    req.session.error = req.flash('error')
                    res.redirect('/reset-password/' + token)
                }
            } else {
                req.flash('error', 'Le mot de passe doit contenir minimums 8 caractères !')
                req.session.error = req.flash('error')
                res.redirect('/reset-password/' + token)
            }

        })
    }
}