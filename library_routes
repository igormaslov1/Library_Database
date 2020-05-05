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
    console.log(current_library[0].author)
    for(let val of current_library) {
        if (val.author == author_name) {
            output_books[i] = val;
            i++
        }
    }
    res.send(output_books)
})


// Route return list of user with a specific title.
// Notice how the filter HOV is used to retrieve the matching user.

app.get('/api/quiz/:quizid', function(req,res) {

    // Get the userid from the route's url.
    var q_id = req.params['quizid'];
    // filter the array; return enly entries use userId field eqials 1_id
    // Note that userId is integer.
    if (q_id == 1) {
        current_quiz = quiz_data["results"]["Quiz1"];
        rQuest = {
            QuizId : current_quiz.quizid,
            QuizTitle : current_quiz.title,
            QuizDescription : current_quiz.description
        }
    }
    else {
        current_quiz = quiz_data["results"]["Quiz2"];
        rQuest = {
            QuizId : current_quiz.quizid,
            QuizTitle : current_quiz.title,
            QuizDescription : current_quiz.description
        }
    }
    // Return the object.
    res.send(rQuest)
})

app.get('/api/quiz/:quizid/:questionid', function(req,res) {

    var q_id = req.params['quizid'];
    var qu_id = req.params['questionid'];

    if (qu_id == 'first') {
        meta_index = 0
        qu_id = 0
    }

    if (q_id == 1){
        return_quizes = quiz_data["results"]["Quiz1"];
    }
    else{
        return_quizes = quiz_data["results"]["Quiz2"];
    }
    meta_index =  return_quizes.questions[qu_id].qnum;

    if (meta_index >= 21){
        meta_index = -1;
    }
    return_answers = [];


    if (return_quizes.questions[qu_id].type == "mc" || return_quizes.questions[qu_id].type == "imc"){
        return_answers = {
            "QId" : return_quizes.questions[qu_id].qnum,
            "QType" : return_quizes.questions[qu_id].type,
            "Q" : return_quizes.questions[qu_id].q,
            "AnswerOptions" : return_quizes.questions[qu_id].answers,
            "meta_index" : meta_index
        }
    }

    else if (return_quizes.questions[qu_id].type == "tf") {
        return_answers = {
            "QId" : return_quizes.questions[qu_id].qnum,
            "QType" : return_quizes.questions[qu_id].type,
            "Q" : return_quizes.questions[qu_id].q,
            "AnswerOptions" : return_quizes.questions[qu_id].answers,
            "meta_index" : meta_index
        }
    }
    else{
        answer_message = "Answer Options: [This is a short response question, answers options are not available ]"
        return_answers = {
            "QId" : return_quizes.questions[qu_id].qnum,
            "QType" : return_quizes.questions[qu_id].type,
            "Q" : return_quizes.questions[qu_id].q,
            "AnswerOptions" : answer_message,
            "meta_index" : meta_index
        }
    }



    res.send(return_answers)
})


app.get('/api/check_answer/:quizid/:questionid/:answer', function(req,res) {

    var q_id = req.params['quizid'];
    var qu_id = req.params['questionid'];
    var current_ans = req.params['answer'];
    var correct_ans = false;

    if (q_id == 1){
        return_quizes = quiz_data["results"]["Quiz1"];
    }
    else{
        return_quizes = quiz_data["results"]["Quiz2"];
    }

    if (current_ans == return_quizes.questions[qu_id].ans ){
        correct_ans = true
        return_qID = {
            "QId" : return_quizes.questions[qu_id].qnum,
            "UserAns" : current_ans,
            "ActAns" : return_quizes.questions[qu_id].ans,
            "Correct" : "true",
            "feedback" : "Good Job! Keep it up!"
        }
    }
    else{
        return_qID = {
            "QId" : return_quizes.questions[qu_id].qnum,
            "UserAns" : current_ans,
            "ActAns" : return_quizes.questions[qu_id].ans,
            "Correct" : "false",
            "feedback" : return_quizes.questions[qu_id].description
        }
    }
    res.send(return_qID)
})



module.exports = router
