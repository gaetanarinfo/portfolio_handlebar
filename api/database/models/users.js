const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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