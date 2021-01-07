const bcrypt = require('bcrypt');
const User = require('../../database/models/users')

/*
 * Controller
 *************/
module.exports = {
    // Method post
    post: (req, res) => {
        const { email, password } = req.body;

        console.log(req.body);

        User.findOne({ email }, (error, user) => {
            if (user) {

                console.log(user);

                bcrypt.compare(password, user.password, (error, same) => {
                    if (same) {

                        req.session.userId = user._id

                        res.redirect('/admin')
                    } else {
                        res.redirect('/')
                    }
                })

            } else {
                return res.redirect('/')
            }
        })
    }
}