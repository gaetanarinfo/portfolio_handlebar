const mongoose = require('mongoose');

// MongoDb Collection Projet
const GalerieShema = new mongoose.Schema({

    title: String,
    image: String,
    active: Boolean

});

const Galerie = mongoose.model('galeries', GalerieShema);

module.exports = Galerie;