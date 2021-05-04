/*
 * Import Module
 ****************/

/*
 * Controller
 *************/
module.exports = {

    // Method Get pour envoyer les datas vers la page
    get: async(req, res) => {
        res.render('cgu')
    }

}