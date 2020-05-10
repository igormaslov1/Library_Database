const express = require('express')
const router = express.Router()
var port = process.env.PORT || 2000;
var app = express()
const fs = require('fs')

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
const library_data1 = dataset.library_data1;


// Route return user with a specific id.
// Notice how the filter HOV is used to retrieve the matching user.


app.get('/library/addBook/:title/:titleID/:author/:authorID/:publisher/:publisherID/:genre/:genreID/:language/:isbn/:size/:year', function(req,res) {
    var title = req.params['title'];
    var titleID = req.params['titleID'];
    var author = req.params['author'];
    var authorID = req.params['authorID'];
    var publisher = req.params['publisher'];
    var publisherID = req.params['publisherID'];
    var genre = req.params['genre'];
    var genreID = req.params['genreID'];
    var language = req.params['language'];
    var isbn = req.params['isbn'];
    var size = req.params['size'];
    var year = req.params['year'];

    let current_library = library_data1["results"];
    var output_books = []
    var i = 0;
    for (let val of current_library) {
        output_books[i] = val;
        i++
    }

    const book = {
        "title": title,
        "titleID":titleID,
        "author":author,
        "authorID":authorID,
        "publisher":publisher,
        "publisherID:":publisherID,
        "genre":genre,
        "genreID":genreID,
        "language":language,
        "isbn":isbn,
        "size":size,
        "year":year
    }
    output_books[i] = book;
    const jsonString = JSON.stringify(output_books, null, 2)
    let feedback = {}
    fs.writeFile('./tsconfig.json', jsonString, err => {
        if (err) {
            feedback = {
                feedback : "Error writing file"
            }
        } else {
            feedback = {
                feedback : "Book successfully added"
            }
        }
        res.send(feedback)
    })
})

app.get('/library/byauthor/:author', function(req,res) {
    var author_name = req.params['author'];
    let current_library = library_data1["results"];
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
    let current_library = library_data1["results"];
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
    let current_library = library_data1["results"];
    var output_books = []
    var i = 0;
    for(let val of current_library) {
        console.log(val.titleID)
        console.log(title)
        if (val.titleID.includes(title) == true) {
            output_books[i] = val;
            i++
        }
    }
    res.send(output_books)
})

app.get('/library/byGenre/:genre', function(req,res) {
    var genre = req.params['genre'];
    let current_library = library_data1["results"];
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
    let current_library = library_data1["results"];
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
