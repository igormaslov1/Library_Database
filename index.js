var express = require("express")
var app = express()

// Require the module we created above and that includes the two notification routes.
var book_routes = require('./library_routes');

// Define an applicatiosn.
var app = express()



app.use('/notify', book_routes);

