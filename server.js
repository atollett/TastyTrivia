require("dotenv").config();

var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var expressSession = require("express-session");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static(__dirname + '/public'));
app.use(express.static("views"));


// Routes
// =============================================================
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});



// var app = express();
// var PORT = process.env.PORT || 3000;

// // Middleware
// app.use(bodyParser.urlencoded({
//   extended: false
// }));
// app.use(bodyParser.json());
// app.use(express.static("public"));
// app.use(
//   expressSession({
//     secret: "keyboard cat",
//     resave: true,
//     saveUnintialized: true
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());


// // Handlebars
// app.engine(
//   "handlebars",
//   exphbs({
//     defaultLayout: "main"
//   })
// );
// app.set("view engine", "handlebars");

// // Routes
// //require("./routes/apiRoutes")(app, passport);
// //require("./routes/htmlRoutes")(app);

// var syncOptions = {
//   force: false
// };

// // If running a test, set syncOptions.force to true
// // clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// // Starting the server, syncing our models ------------------------------------/
// db.sequelize.sync(syncOptions).then(function () {
//   app.listen(PORT, function () {
//     console.log(
//       "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
//       PORT,
//       PORT
//     );
//   });
// });

module.exports = app;