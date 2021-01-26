/*
 * Controller
 *************/
module.exports = {
    // Method Get

    getCat: async(req, res) => {

        const success = req.session.success, // Message Succes
            error = req.session.error // Message Error

        req.session.success = ''
        req.session.error = ''

        const query = { category: req.params.category }


        // Ici on recherche nos tutos
        Tuto.find(query)
            .lean()
            .exec((err, tutosCat) => {
                if (success || error) {
                    res.render('tutorielCat', {
                        tutosCat: tutosCat,
                        layout: false,
                        success: success,
                        error: error,
                        title: 'Les tutoriels de mon portfolio',
                        content: "Les tutoriels de mon portfolio"
                    })
                } else {
                    res.render('tutorielCat', {
                        tutosCat: tutosCat,
                        layout: false,
                        error: error,
                        title: 'Les tutoriels de mon portfolio',
                        content: "Les tutoriels de mon portfolio"
                    })
                }

            })

    }

}