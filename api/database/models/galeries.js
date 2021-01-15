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
        type: Number,
        default: 0
    }

});

const Galerie = mongoose.model('galeries', GalerieShema);

module.exports = Galerie;