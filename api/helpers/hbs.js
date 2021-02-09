/*
 * Import Module
 ****************/
const dateFr = require('../helpers/dateFr'),
    Handlebars = require('handlebars')

/*
 * Controller
 *************/
module.exports = {

    // Function pour limiter par exemple le nombre d'article
    limit: function(arr, limit) {
        if (!Array.isArray(arr)) {
            return [];
        }
        return arr.slice(0, limit);
    },

    // Function pour parser la date
    generateDate: (dates) => {
        return dateFr(dates, "d mmmm yyyy à H:MM")
    },

    // Function qui permet de comparer 2 variables
    ifEquals: function(a, b, options) {
        if (a > b) {

            return options.fn(this)
        }

        return options.inverse(this)

    },

    // Function de limitation de caractére dans un texte
    trimString: function(passedString) {
        var theString = passedString.substring(0, 200);
        return new Handlebars.SafeString(theString) + '...'
    },

    // Function de limitation de caractére dans un texte
    trimString2: function(passedString) {
        var theString = passedString.substring(0, 100);
        return new Handlebars.SafeString(theString) + '...'
    },

    // Function like qui permet de retourner si l'utilisateur à liké ou pas
    ifLike: function(arr, user, options) {

        for (let i = 0; i < arr.length; i++) {

            if (arr[i] == user) {
                return options.inverse(this)
            }

        }

        return options.fn(this)

    },

    // Function pour compter le nombre de résultat sous forme de chiffre
    countArray: function(arr, user) {

        if (arr.length > 0) {
            return arr.length
        } else {
            return '0'
        }

    }
}