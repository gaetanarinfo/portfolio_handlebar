const mongoose = require('mongoose');

// MongoDb Collection Tuto Youtube
const TutoShema = new mongoose.Schema({

    title: String,
    content: String,
    api: String,
    date: String,
    links: String,
    isPrivate: {
        type: Boolean,
        default: false
    }

});

const Tutos = mongoose.model('tutos', TutoShema);

module.exports = Tutos;