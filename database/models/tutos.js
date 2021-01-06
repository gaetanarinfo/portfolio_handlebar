var mongoose = require('mongoose');

// MongoDb Collection Tuto Youtube
var TutoShema = new mongoose.Schema({

    title: String,
    content: String,
    api: String,
    date: String,
    links: String

});

var Tutos = mongoose.model('tutos', TutoShema);

module.exports = Tutos;