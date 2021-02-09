/*
 * Import Module
 ****************/
const mongoose = require('mongoose');

// MongoDb Collection Model Youtube
const TutoShema = new mongoose.Schema({

    title: String,
    content: String,
    api: String,
    date: String,
    links: String,
    isPrivate: {
        type: Boolean,
        default: false
    },
    category: String

});

// Déclaration du model galerie dans projet
const Tutos = mongoose.model('tutos', TutoShema);

/*
 * Export Module
 ****************/
module.exports = Tutos;