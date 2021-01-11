// Module date en fr
const dateFr = require('../helpers/dateFr')
const Comment = require('../database/models/comments')

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

}