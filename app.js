// Reload Server

const livereload = require('livereload'),
    reload = livereload.createServer(),
    express = require('express'),
    exphbs = require('express-handlebars'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    MongoStore = require('connect-mongo'),
    mongoose = require('mongoose'),
    flash = require('express-flash'),
    mongoStore = MongoStore(expressSession),
    // Swagger
    swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./api/config/swagger.json'),
    // Helmet security
    helmet = require("helmet");

//ENV
require('dotenv').config()
require('./api/database/db')

reload.watch(__dirname + "/app.js")

const app = express()

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

app.use(flash());

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Dossier des ressources
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

// Port du serveur
const port = process.env.PORT || 3000

app.use('*', (req, res, next) => {
    res.locals.users = req.session.userId
    res.locals.admin = req.session.isAdmin
    res.locals.userAdmin = req.session
    next()
})

app.engine('handlebars', exphbs({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    helpers: {
        generateDate: require('./api/helpers/hbs').generateDate,
        limit: require('./api/helpers/hbs').limit,
        countArray: require('./api/helpers/hbs').countArray,
        ifEquals: require('./api/helpers/hbs').ifEquals,
        trimString: require('./api/helpers/hbs').trimString,
        ifLike: require('./api/helpers/hbs').ifLike,
        trimString2: require('./api/helpers/hbs').trimString2
    }
}))
app.set('view engine', 'handlebars')

// Rooter
const ROUTER = require('./api/controllers/router')
app.use('/', ROUTER);

// Route Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Page 404
app.use((req, res) => {
    res.render('404', { layout: false })
})

// This...
app.use(helmet());

// ...is equivalent to this:
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

reload.watch(__dirname + "/public")

app.listen(port, '', function() {
    console.log(`Ecoute le port ${port}, lancé le : ${new Date().toLocaleString()}`)
})