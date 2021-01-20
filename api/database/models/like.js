const mongoose = require('mongoose');
const Schema = mongoose.Schema

// Import model
const Projet = require('./projets')

// MongoDb Collection Projet
const LikeShema = new mongoose.Schema({

    userID: Schema.Types.ObjectId,
    projetID: {
        type: Schema.Types.ObjectId,
        ref: 'projets'
    }

});

const Like = mongoose.model('likes', LikeShema);

module.exports = Like;