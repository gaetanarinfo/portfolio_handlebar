/*
 * Import Module
 ****************/
const dateFormat = require("dateformat")

dateFormat.i18n = {
    monthNames: [
        "Jan",
        "Fev",
        "Mar",
        "Avr",
        "Mai",
        "Jun",
        "Jui",
        "Aoû",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        "Janvier",
        "Février",
        "Mars",
        "Avril",
        "Mai",
        "Juin",
        "Juillet",
        "Août",
        "Septembre",
        "Octobre",
        "Novembre",
        "Décembre",
    ],
    timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
};

/*
 * Controller
 *************/
module.exports = {

    // Function Qui return la date
    date: function(date, format) {

        return dateFormat(date, format)
    }
}

/*
 * Export module
 *************/
module.exports = dateFormat