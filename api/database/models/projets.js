const mongoose = require('mongoose');

// MongoDb Collection Projet
const ProjetShema = new mongoose.Schema({

    title: String,
    content: String,
    image: String,
    like: String,
    date: String,
    links: Number,
    isPrivate: {
        type: Boolean,
        default: false
    }

});

const Projet = mongoose.model('projets', ProjetShema);

module.exports = Projet;