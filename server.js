//Dependencies
const bodyParser = require('body-parser'),
      cheerio = require('cheerio'),
      axios = require('axios'),
      express = require('express'),
      path = require('path'),
      exphbs = require('express-handlebars'),
      mongoose = require('mongoose'),
      logger = require('morgan'),
      request = require('request');

//Initialize express
const PORT = process.env.PORT || 8080,
      app = express();

//static content(public folder)
app.use(express.static(path.join(__dirname, '/public')));

//database
const db = require('./models');
    //use morgan to log requests
    app.use(logger('dev'));

    // If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
    const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

    // Set mongoose to leverage built in JavaScript ES6 Promises
    // Connect to the Mongo DB
    mongoose.Promise = Promise;
    mongoose.connect(MONGODB_URI);

//parsing
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//routing
const apiRoutes = require('./controllers/api-routes');
const hbsRoutes = require('./controllers/hbs-routes');
app.use('/', apiRoutes);
app.use('/', hbsRoutes);

//views
const hbs = exphbs.create({defaultLayout: 'main'});
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//listener
app.listen(PORT, function(){
    console.log("App listening on http://localhost:" + PORT);
});