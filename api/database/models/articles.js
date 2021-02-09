/*
 * Import Module
 ****************/
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Comment = require('./comments')

// MongoDb Collection Model Article
const ArticleShema = new mongoose.Schema({

    title: String,
    content: String,
    image: String,
    name: String,
    author: String,
    dateCreate: String,
    active: Boolean,
    isAdmin: Boolean,
    avatar: String,
    isPrivate: {
        type: Boolean,
        default: false
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }]

});

// Déclaration du model comment dans mongodb
const Article = mongoose.model('articles', ArticleShema);

/*
 * Export Module
 ****************/
module.exports = Article;