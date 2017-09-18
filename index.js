const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const Snippets = require('./snippet');
const User = require('./user');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/snippets');

const app = express();

// configures your app to use sessions
// properly.
app.use(session({
    secret: 'PORKCHOP SANDWICHES',
    resave: false,
    saveUninitialized: true
}));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({ extended: true }));

//signup
app.post('/registerNew', function(req, res) {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
});
    res.render('snippets', {
      message: "Must Login First"
    });
  });
  
  app.post('/registered', function(req, res) {
    res.render('snippets');
  });
  

// find and display all snippets
app.get('/', function(req, res) {
 Snippets.find()
 .then(function(data){
    res.render('snippets',
    {
        currentUser: req.session.user,
        Display: data,
    });
    
 })
 .catch(function(handleError){
     console.log(handleError);
 });
});

app.post('/login', function (req, res) { 
    // retrieve the values for username and password
    // that have been posted to you. in the form.
    // req.body .......
    let username = req.body.name;
    let password = req.body.password;


    // try to find a user (with mongoose) that has that username and password
    User.findOne(
        { name: username, password: password }).then(function (data) {
        if (data !== null) {
            console.log(data);
            // if that user exists, save the user
            // to req.session.
            req.session.user = data;
        } else {
     res.redirect('/');}
    });
});

app.post('/snippets', function(req, res) {
    // associate a user with this snippet that's being
    // created
    if (req.session.who !== undefined) {
    

    Snippets.create({
        title: req.body.title,
        language: req.body.language,
        codeBody: req.body.code,
        optionalNotes: req.body.notes,
        tags: req.body.tags
    }); 
} else {

    res.redirect('/');
   }
});

// allow you to create a snippet 
// connect textBox with server, allow people to submit and post new snippets
app.get("/snippets", (function(req, res) {
    // Snippets.update(req.body)
}));

app.get("/user/:userid/snippets", function(req, res) {
    // snippets.find(req.body.snippets)
    let userId = req.params.userid;

    // retrieve all snippets belonging to that userId

    // render those snippets in a view
    User.findOne({ _id: userId })
    .populate('snippets')
    .exec(function (err, user) {
        res.render('snippets', {
            Display: user.snippets,
        });
    });
});

app.post('/logout', function(req, res) {
    req.session.destroy(function() {
      res.render('snippets', {
        message: "Please sign in"
      });
    });
  });


app.listen(3032);