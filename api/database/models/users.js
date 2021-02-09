/*
 * Import Module
 ****************/
const mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    randtoken = require('rand-token')

// MongoDb Collection Model Users
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
    name: String,
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
    },
    isLog: {
        type: Date,
        default: ''
    },
    ip: String

});

UsersShema.pre('save', function(next) {

    const users = this

    // On hash le mot de passe avec un force 10 pour mieux sécuriser le mot de passe
    bcrypt.hash(users.password, 10, (error, encrypted) => {
        users.password = encrypted
        next()
    })

})

/*
 * Export Module
 ****************/
module.exports = mongoose.model('users', UsersShema);