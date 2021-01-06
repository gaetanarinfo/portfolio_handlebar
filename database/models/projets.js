var mongoose = require('mongoose');

// MongoDb Collection Projet
var ProjetShema = new mongoose.Schema({

    title: String,
    content: String,
    image: String,
    like: String,
    date: String,
    links: String

});

var Projet = mongoose.model('projets', ProjetShema);

module.exports = Projet;