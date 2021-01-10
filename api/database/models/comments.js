const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

// MongoDb Collection Projet
const CommentShema = new mongoose.Schema({

    _articleid: ObjectId,
    author: String,
    dateCreate: String,
    avatar: String,
    content: {
        type: String,
        required: [true, "Le commentaire est obligatoire"],
    }

});

const Comment = mongoose.model('comments', CommentShema);

module.exports = Comment;