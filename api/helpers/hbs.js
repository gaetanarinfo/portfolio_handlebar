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

    ifLike: function(a, options) {
        if (a != '0') {

            return options.fn(this)
        }

        return options.inverse(this)

    }
}