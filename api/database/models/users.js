const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    randtoken = require('rand-token')

// MongoDb Collection Tuto Youtube
const UsersShema = new mongoose.Schema({

    firstname: {
        type: String,
        required: [true, "Le prénom est obligatoire"]
    },
    lastname: {
        type: String,
        required: [true, "Le nom est obligatoire"]
    },
    avatar: {
        type: String,
        required: [true, "L'avatar n'est pas bon"]
    },
    email: {
        type: String,
        required: [true, "L'adresse email est obligatoire"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est obligatoire"]
    },
    createDate: {
        type: Date,
        default: new Date()
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: randtoken.generate(30)
    }

});

UsersShema.pre('save', function(next) {

    const users = this

    bcrypt.hash(users.password, 10, (error, encrypted) => {
        users.password = encrypted
        next()
    })

})

module.exports = mongoose.model('users', UsersShema);