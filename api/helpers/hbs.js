// Module date en fr
const dateFr = require('../helpers/dateFr'),
    Handlebars = require('handlebars'),
    Like = require('../database/models/like'),
    Projet = require('../database/models/projets')

module.exports = {

    limit: function(arr, limit) {
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.slice(0, limit);
    },

    generateDate: (dates) => {
        return dateFr(dates, "d mmmm yyyy à H:MM")
    },


    ifEquals: function(a, b, options) {
        if (a > b) {

            return options.fn(this)
        }

        return options.inverse(this)

    },

    trimString: function(passedString) {
        var theString = passedString.substring(0, 200);
        return new Handlebars.SafeString(theString) + '...'
    },

    trimString2: function(passedString) {
        var theString = passedString.substring(0, 100);
        return new Handlebars.SafeString(theString) + '...'
    },

    ifLike: function(a, b, option) {

        Projet
        // Nous recherchons une article ayant le meme ID que notre req.params.id
            .findById(a)
            // Nous utilisons populate afin de ressortir les datas des models en relation avec notre constructeur principal
            .populate('like userID')
            .lean()

        // Nous executons nous recherche
        .exec((err, result) => {

            if (result.like.length == 0 || result.like == b) {

                console.log('Pas liké');

            } else {

                console.log('Liké');

            }

        })

    },

    countArray: (arr) => {
        return arr.length
    }
}