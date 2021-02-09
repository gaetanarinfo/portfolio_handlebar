/*
 * Import Module
 ****************/
const mongoose = require('mongoose'),
    Schema = mongoose.Schema

// MongoDb Collection Model Projet
const ProjetShema = new mongoose.Schema({

    title: String,
    content: String,
    image: String,
    name: String,
    date: String,
    links: Number,
    isPrivate: {
        type: Boolean,
        default: false
    },
    like: [{
        type: Schema.Types.ObjectId
    }]

});

// Déclaration du model galerie dans projet
const Projet = mongoose.model('projets', ProjetShema);

/*
 * Export Module
 ****************/
module.exports = Projet;