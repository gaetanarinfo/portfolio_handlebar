/*
 * Controller
 *************/
module.exports = {

    getPreloader: (req, res) => {
        res.render('preloader', { layout: 'preloader' })
    }

}