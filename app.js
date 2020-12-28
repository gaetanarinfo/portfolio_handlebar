// Reload Dev

const livereload = require('livereload');
const reload = livereload.createServer();
reload.watch(__dirname + "/app.js");

var express = require('express');
var exphbs = require('express-handlebars');

var app = express();

// Dossier des ressources
app.use(express.static('public'));

const port = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//root

app.get('/', function(req, res) {
    res.render('index')
})

app.get('/404', function(req, res, next) {
    res.render('404', { layout: false });
})

app.get('/article', function(req, res, next) {
    res.render('article');
})

app.get('/blog', function(req, res, next) {
    res.render('blog');
})

app.get('/admin', function(req, res, next) {
    res.render('admin', { layout: 'main2' });
})


app.listen(port, 'localhost', function() {
    console.log('Le serveur tourne sur le port ' + port);
})

reload.watch(__dirname + "/assets");