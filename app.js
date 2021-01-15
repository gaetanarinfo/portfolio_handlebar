// Reload Server

const livereload = require('livereload')
const reload = livereload.createServer()
reload.watch(__dirname + "/app.js")

const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const fileupload = require('express-fileupload')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')
const flash = require('express-flash');
const fileUpload = require('express-fileupload');

const mongoStore = MongoStore(expressSession)

//ENV
require('dotenv').config()
require('./api/database/db')

const app = express()

app.use(expressSession({
    secret: 'labelleauboisdormanssursonarbreperché',
    name: 'portfolio',
    saveUninitialized: true,
    resave: false,

    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(flash());

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(fileUpload({
    limits: { fileSize: 10 * 1024 * 1024 },
    abortOnLimit: false
}));

// Dossier des ressources
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

// Port du serveur
const port = process.env.PORT || 3000

app.use('*', (req, res, next) => {
    res.locals.users = req.session.userId
    res.locals.admin = req.session.isAdmin
    next()
})

app.engine('handlebars', exphbs({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    helpers: {
        generateDate: require('./api/helpers/hbs').generateDate,
        limit: require('./api/helpers/hbs').limit,
        ifEquals: require('./api/helpers/hbs').ifEquals,
        trimString: require('./api/helpers/hbs').trimString
    }
}))
app.set('view engine', 'handlebars')

// Rooter
const ROUTER = require('./api/controllers/router')
app.use('/', ROUTER);

// Page 404
app.use((req, res) => {
    res.render('404', { layout: false })
})

reload.watch(__dirname + "/public")

app.listen(port, '', function() {
    console.log(`Ecoute le port ${port}, lancé le : ${new Date().toLocaleString()}`)
})