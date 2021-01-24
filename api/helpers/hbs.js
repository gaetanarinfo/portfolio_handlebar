// Module date en fr
const dateFr = require('../helpers/dateFr'),
    Handlebars = require('handlebars')

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

    ifLike: async function(arr, user, options) {


        // const Projet = require('../database/models/projets'),
        //     query = arr,
        //     iduser = user,
        //     projet = await Projet.findById(query),
        //     like = projet.like

        // console.log(like);

        // if (like != iduser) {

        //     return options.fn(this.limit)
        // }

        // return options.inverse(this.limit)


    },

    countArray: function(arr, user) {

        if (arr.length > 0) {
            return arr.length
        } else {
            return '0'
        }

    }
}