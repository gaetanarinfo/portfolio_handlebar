const mongoose = require('mongoose');

// MongoDb Collection Projet
const ArticleShema = new mongoose.Schema({

    title: String,
    content: String,
    image: String,
    author: String,
    dateCreate: String,
    active: Boolean,
    isAdmin: Boolean,
    avatar: String,
    comment: {
        type: Number
    },
    isPrivate: {
        type: Number,
        default: 0
    }

});

const Article = mongoose.model('articles', ArticleShema);

module.exports = Article;