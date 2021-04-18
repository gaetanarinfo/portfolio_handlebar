// Déclaration des packages npm ---->

const express = require('express'), // Package express
    exphbs = require('express-handlebars'), // Package handlebar Moustache pour les fichiers .hbs
    bodyParser = require('body-parser'), // Package permettant de parser les urls avec id
    expressSession = require('express-session'), // Package permettant de crée des session avec express
    methodOverride = require('method-override') // Package permettant de faire un Put et un Delete

// Package de BDD gerer avec mongodb et atlas cloud et gestion des sessions
const MongoStore = require('connect-mongo'),
    mongoose = require('mongoose'),
    mongoStore = MongoStore(expressSession)

// Package des message d'érreur et de succès    
const flash = require('express-flash')

// Helmet aide à sécuriser les applications Express.js en définissant divers en-têtes HTTP. Ce n'est pas un argent
const helmet = require("helmet")

// Package de configuration sécurisé pour le portfolio
require('dotenv').config()

// Module pour le lancement de la BDD
require('./api/database/db')

// Module express pour faire fonctionné l'aplication
const app = express()

// Module App gestion des cookies
app.set('trust proxy', 1) // trust first proxy
app.use(expressSession({
    secret: 'labelleauboisdormanssursonarbreperché',
    name: 'portfolio',
    saveUninitialized: false,
    resave: false,
    cookie: {
        path: '/',
        maxAge: 1000000
    },
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

// Method Override
app.use(methodOverride('_method'))

// Permet d'afficher les messages d'erreur et de succès
app.use(flash());

// Module permettant de parser les urls du type :id
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Dossier des ressources 
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

// Port du serveur
const port = process.env.PORT || 3000

// App.use * est un middleware pour proteger la partie Administration ou bien cacher un bouton pour le visiteur
app.use('*', (req, res, next) => {
    res.locals.users = req.session.userId
    res.locals.admin = req.session.isAdmin
    res.locals.userAdmin = req.session
    res.locals.user = req.session
    next()
})

// Moteur de templating 
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    helpers: {
        generateDate: require('./api/helpers/hbs').generateDate, // Permet de convertir des dates
        limit: require('./api/helpers/hbs').limit, // Limit d'article
        countArray: require('./api/helpers/hbs').countArray, // Condition pour le nombre des likes ou commentaire
        ifEquals: require('./api/helpers/hbs').ifEquals, // Condition si a est plus grand que b
        trimString: require('./api/helpers/hbs').trimString, // Condition pour réduire le nombre de caractère
        ifLike: require('./api/helpers/hbs').ifLike, // Condition pour les likes
        trimString2: require('./api/helpers/hbs').trimString2, // Condition pour réduire le nombre de caractère
        trimString3: require('./api/helpers/hbs').trimString3 // Condition pour réduire le nombre de caractère
    }
}))
app.set('view engine', 'hbs')

// Les différentes route et controller
const ROUTER = require('./api/controllers/router')
app.use('/', ROUTER); // (/ = home) :)


// Page 404
app.use((req, res) => {
    res.render('404', { layout: false })
})

// Helmet security pour les failles XSS etc...
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
app.disable('x-powered-by');

// Lancement de l'application avec le port et la date de lancement
app.listen(port, '', function() {
    console.log(`Ecoute le port ${port}, lancé le : ${new Date().toLocaleString()}`)
})

module.exports = app