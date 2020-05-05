const express = require('express')
const router = express.Router()
var port = process.env.PORT || 2000;
var app = express()

app.use(function (req,res,next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

// Register two routes to the router object instace
app.listen(port,() => {
    console.log(`Server running at port `+port);
});


// Require the module that defines the JSON object.
const dataset = require('./json_dataset');

// extract the specific JSON object that stores a user's data
const library_data = dataset.library_data;

// Route return user with a specific id.
// Notice how the filter HOV is used to retrieve the matching user.

app.get('/library/byauthor/:author', function(req,res) {
    var author_name = req.params['author'];
    let current_library = library_data["results"]["Books"];
    var output_books = []
    var i = 0;
    for(let val of current_library) {
        if (val.authorID == author_name) {
            output_books[i] = val;
            i++
        }
    }
    res.send(output_books)
})

app.get('/library/view_collection', function(req,res) {
    let current_library = library_data["results"]["Books"];
    var output_books = []
    var i = 0;
    for (let val of current_library) {
        output_books[i] = val;
        i++
    }
    res.send(output_books)
})

app.get('/library/byBookTitle/:title', function(req,res) {
    var title = req.params['title'];
    let current_library = library_data["results"]["Books"];
    var output_books = []
    var i = 0;
    for(let val of current_library) {
        if (val.titleID == title) {
            output_books[i] = val;
            i++
        }
    }
    res.send(output_books)
})

app.get('/library/byGenre/:genre', function(req,res) {
    var genre = req.params['genre'];
    let current_library = library_data["results"]["Books"];
    var output_books = []
    var i = 0;
    for(let val of current_library) {
        if (val.genreID == genre) {
            output_books[i] = val;
            i++
        }
    }
    res.send(output_books)
})

app.get('/library/byPublisher/:publisher', function(req,res) {
    var publisher = req.params['publisher'];
    let current_library = library_data["results"]["Books"];
    var output_books = []
    var i = 0;
    for(let val of current_library) {
        if (val.publisherID == publisher) {
            output_books[i] = val;
            i++
        }
    }
    res.send(output_books)
})


module.exports = router
