const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Import model
const Comment = require('./comments')

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
    isPrivate: {
        type: Boolean,
        default: false
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'comments'
    }]

});

const Article = mongoose.model('articles', ArticleShema);



module.exports = Article;