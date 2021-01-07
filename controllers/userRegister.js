const User = require('../database/models/users');

module.exports = (req, res) => {

    console.log("Controllers create user : ");
    console.log(req.body);

    User
        .create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        }, (err) => {
            if (err) console.log(err)

            req.flash('success', 'Merci d avoir entrer un titre')
            // console.log(res)
                // Et on redirige sur la page /article pour que notre nouvelle article soit charger au montage de la page
            req.session.success = req.flash('success')
            console.log('coucou post')
            console.log(req.session.success)
            res.redirect('/')
            // res.render('index', {
            //     // Ici on renvoie notre réponse
            //     success: req.flash('success')
            // })

        })

}