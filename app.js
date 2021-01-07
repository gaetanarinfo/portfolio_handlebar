// Reload Dev

const livereload = require('livereload')
const reload = livereload.createServer()
reload.watch(__dirname + "/app.js")

const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const {
    allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access')
const fileupload = require('express-fileupload')
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')
const { stripTags, limit } = require('./helpers/hbs')
const flash = require('express-flash');

const Handlebars = require("handlebars")
const moment = require("moment")

// Import Auth && Rooter
const auth = require("./middleware/auth")
const ROUTER = require('./controllers/router')

mongoose.connect('mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})
const mongoStore = MongoStore(expressSession)

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
app.use(fileupload())

// Dossier des ressources
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 3000

// MiddleWare
const redirectAuthSuccess = require('./middleware/redirectAuthSuccess')

app.use('*', (req, res, next) => {
    res.locals.users = req.session.userId
    next()
})

app.engine('handlebars', exphbs({
    extname: 'handlebars',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    helpers: {
        generateDate: (date, format) => {
            return moment(date).format(format)
        },
        stripTags: stripTags,
        limit: limit
    }
}))
app.set('view engine', 'handlebars')

// Router
app.get('/', ROUTER);
app.get('/blog', ROUTER);
app.get('/article', ROUTER);
app.get('/admin', auth, ROUTER);
app.post('/user/register', redirectAuthSuccess, ROUTER);
app.post('/user/auth', ROUTER);
app.get('/user/logout', ROUTER);

// Page 404
app.use((req, res) => {
    res.render('404', { layout: false })
})

reload.watch(__dirname + "/public")

app.listen(port, '', function() {
    console.log(`Ecoute le port ${port}, lancé le : ${new Date().toLocaleString()}`)
})