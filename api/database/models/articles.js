const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

// MongoDb Collection Projet
const ArticleShema = new mongoose.Schema({

    title: String,
    content: String,
    image: String,
    author: String,
    dateCreate: String,
    active: Boolean,
    comment: {
        type: Number
    }

});

const Article = mongoose.model('articles', ArticleShema);

module.exports = Article;