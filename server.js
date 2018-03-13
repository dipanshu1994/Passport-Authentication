const express = require('express');
const app = express();
const passport = require('passport');

const ejs = require('ejs');
const bodyParser= require('body-parser');

 
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views','views');
app.set('view engine', 'ejs');

app.listen(8000,function(){
  console.log('server is running');
});

app.get('/',(req,res)=>{
  res.render('auth')
});

/*  PASSPORT SETUP  */


app.use(passport.initialize());
app.use(passport.session());

app.get('/success', (req, res) => res.send("Welcome "+req.query.username+"!!"));
app.get('/error', (req, res) => res.send("error logging in"));
app.get('/deepanshu', (req, res) => res.send("hello deepanshu"));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
 


/* MONGOOSE SETUP */

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/MyDataBase');

const Schema = mongoose.Schema;
const UserDetail = new Schema({
      username: String,
      password: String
    });
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

	 
	UserDetails.find({},function(err,doc){
		console.log(doc);
	})




/* PASSPORT LOCAL AUTHENTICATION */

const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
      UserDetails.findOne({
        username: username,

      }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false);
        }

        if (user.password != password) { 
          return done(null, false);
        }
        return done(null, user);
      });
  }
));

app.post('/',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    res.redirect('/success?username='+req.user.username);
   
  });
