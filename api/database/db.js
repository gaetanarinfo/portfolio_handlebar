const mongoose = require('mongoose')

mongoose
    .connect(process.env.MONGO_URI, { // URI = chemin
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('Connecté à la BDD'))
    .catch(err => console.log(err))