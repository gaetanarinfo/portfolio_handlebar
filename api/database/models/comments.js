/*
 * Import Module
 ****************/
const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Article = require('./articles')

// MongoDb Collection Model Comment
const CommentShema = new mongoose.Schema({

    author: String,
    dateCreate: {
        type: Date,
        default: new Date()
    },
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

// Déclaration du model comment dans mongodb
const Comment = mongoose.model('comments', CommentShema);

/*
 * Export Module
 ****************/
module.exports = Comment;