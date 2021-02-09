/*
 * Import Module
 ****************/
const mongoose = require('mongoose');

// MongoDb Collection Model Galerie
const GalerieShema = new mongoose.Schema({

    title: String,
    image: String,
    name: String,
    active: {
        type: Boolean,
        default: false
    },
    isPrivate: {
        type: Boolean,
        default: false
    }

});

// Déclaration du model galerie dans mongodb
const Galerie = mongoose.model('galeries', GalerieShema);

/*
 * Export Module
 ****************/
module.exports = Galerie;