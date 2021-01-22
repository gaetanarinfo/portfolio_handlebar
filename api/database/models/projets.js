const mongoose = require('mongoose');
const Schema = mongoose.Schema

// MongoDb Collection Projet
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

const Projet = mongoose.model('projets', ProjetShema);

module.exports = Projet;