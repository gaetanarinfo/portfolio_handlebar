const mongoose = require('mongoose');

// MongoDb Collection Tuto Youtube
const TutoShema = new mongoose.Schema({

    title: String,
    content: String,
    api: String,
    date: String,
    links: String

});

const Tutos = mongoose.model('tutos', TutoShema);

module.exports = Tutos;