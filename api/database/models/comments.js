const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Import model
const Article = require('./articles')

// MongoDb Collection Projet
const CommentShema = new mongoose.Schema({

    author: String,
    dateCreate: String,
    avatar: String,
    content: {
        type: String,
        required: [true, "Le commentaire est obligatoire"],
    },
    articleID: {
        type: Schema.Types.ObjectId,
        ref: 'articles'
    }

});

const Comment = mongoose.model('comments', CommentShema);

module.exports = Comment;