const mongoose = require('mongoose');

// MongoDb Collection Projet
const GalerieShema = new mongoose.Schema({

    title: String,
    image: String,
    active: {
        type: Boolean,
        default: false
    },
    isPrivate: {
        type: Boolean,
        default: false
    }

});

const Galerie = mongoose.model('galeries', GalerieShema);

module.exports = Galerie;