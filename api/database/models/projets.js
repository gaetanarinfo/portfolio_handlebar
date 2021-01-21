const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Import model
const Like = require('./like')

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
        type: Schema.Types.ObjectId,
        ref: 'likes'
    }]

});

const Projet = mongoose.model('projets', ProjetShema);

module.exports = Projet;