// Reload Dev

const livereload = require('livereload');
const reload = livereload.createServer();
reload.watch(__dirname + "/app.js");

var express = require('express');
var exphbs = require('express-handlebars');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var {
    allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');
var fileupload = require('express-fileupload');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo');
var connectFlash = require('connect-flash');
var { stripTags, limit } = require('./helpers/hbs');

var Handlebars = require("handlebars");
var moment = require("moment");

var home = require("./controllers/home");

const {
    Cookie
} = require('express-session');

mongoose.connect('mongodb://localhost:27017/portfolio', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});
const mongoStore = MongoStore(expressSession);

var app = express();

app.use(connectFlash());

app.use(expressSession({
    secret: 'labelleauboisdormanssursonarbreperché',
    name: 'portfolio',
    saveUninitialized: true,
    resave: false,

    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(fileupload());

// Dossier des ressources
app.use(express.static('public'));

const port = process.env.PORT || 3000;



// ROOT + home <-- pour afficher les cards
app.get('/', home, function(req, res) {
    res.render('index')
})
app.engine('handlebars', exphbs({
    extname: 'handlebars',
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    helpers: {
        generateDate: (date, format) => {
            return moment(date).format(format);
        },
        stripTags: stripTags,
        limit: limit
    }
}));
app.set('view engine', 'handlebars');

// Page 404
app.get('/404', function(req, res, next) {
    res.render('404', { layout: false });
})

// Page article id
app.get('/article', function(req, res, next) {
    res.render('article');
})

// Page Blog
app.get('/blog', function(req, res, next) {
    res.render('blog');
});

// Page Administration
app.get('/admin', function(req, res, next) {
    res.render('admin', { layout: 'admin', partials: 'admin' });
})

Handlebars.registerHelper('if', function(a, b, options) {
    if (a === b) {
        return options.fn(this);
    }

    return options.inverse(this);
});

reload.watch(__dirname + "/assets");

app.listen(port, '', function() {
    console.log(`Ecoute le port ${port}, lancé le : ${new Date().toLocaleString()}`);
})