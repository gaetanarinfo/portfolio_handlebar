const { ObjectID } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema

// MongoDb Collection Projet
const LikeShema = new mongoose.Schema({

    projetId: String,
    userId: ObjectID

});

const Like = mongoose.model('likes', LikeShema);

module.exports = Like;