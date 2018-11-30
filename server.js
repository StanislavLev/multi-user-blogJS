const express = require('express');
const bodyParser= require('body-parser');
const User = require('./models/user');
const Post = require('./models/post');
const uuid = require('uuid/v4')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session);
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const aws = require('aws-sdk');

aws.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_KEY_SECRET
});



const app = express();
mongoose.connect('mongodb+srv://' + process.env.MONGO_ATLAS_USR + ':' + process.env.MONGO_ATLAS_PWD + '@cluster0-x2kw0.mongodb.net/test?retryWrites=true', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware');
    console.log(req.sessionID);
    return uuid(); // use UUIDs for session IDs
  },
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection}),
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      console.log("Inside findOne");
      if (err) { console.log('DB findOne error: ' + err); return done(err); }
      if (!user) {
        console.log("Inside !user");
        return done(null, false, { message: 'Incorrect username.' });
      }
      bcrypt.compare(password, user.password, function(err, equal) {
        if(equal == true){
          console.log("new LocalStrategy: Correct password");
          return done(null, user);
        }
        else {
          console.log("new LocalStrategy: Incorrect password");
          return done(null, false, { message: 'Incorrect password.' });
        }
      });
    });
  }
));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// serve files from dist directory
app.use(express.static(__dirname + '/dist'));



// multer config section
const MAX_IMG_SIZE = 300000;

const fileFilter = function(req, file, cb) {
  const allowedImgTypes = ["image/jpeg", "image/png", "image/gif"];
  
  if(!allowedImgTypes.includes(file.mimetype)) {
    const err = new Error("Wrong image file type");
    err.code = "WRONG_IMG_FILE_TYPE";
    cb(err, false);
  }
  cb(null, true);
}

const upload = multer({
  dest: './temp4resize/',
  fileFilter,
  limits: {
    fileSize: MAX_IMG_SIZE
  }
});
////////////////////////





// register user
// TODO Error handling
app.post('/register', (req, res) => {
  console.log('Inside register');
  console.log(req.body);
  const curr_username = req.body.username;
  const curr_email = req.body.email;
  User
    .find({
      username: curr_username
    })
    .then((users) => {
      if(users.length == 0 && req.body.password == req.body.confirmPassword){
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
          // Store hash in your password DB.
          // Login to passport session 
          User.create({username: curr_username, password: hash, email: curr_email, avatar: 'static/img/default-avatar128.jpg'}).then(function(user){
            req.login(user._id, function(err){
              if (err) { 
                console.log(err);
                return next(err);
              }
              res.send({username: user.username});
            })
            
          });
        });
      }
      else if(req.body.password != req.body.confirmPassword) {
        res.send({message: 'Passwords are not equal, please try again!!!'});
      }
      else {
        res.send({message: 'User with the name already exits, please chose another one!!!'});
      }
    });
})

// TODO move upload avatar to Profile Page, Change name of an uploaded file and think about permission
app.post('/upload', upload.single('avatarImg'), async (req, res) => {
  if(req.isAuthenticated()){
    console.log('Inside upload');
    const s3 = new aws.S3();
    try {
      sharp.cache(false);
      const bufferedImg = await sharp(req.file.path)
        .resize(128, 128)
        .toFormat('jpeg')
        .toBuffer();
          

      const s3res = await s3.upload({
        Bucket: "multiuserblog",
        Key: `${Date.now()}.jpg`,
        Body: bufferedImg,
        ACL: "public-read"
      }).promise();
      
      
      console.log("uploaded");
      console.log(s3res.Location);
      
      fs.unlink(req.file.path, (err) => {
        if(err){
          console.log(err);
        }
        console.log("unlinked");
        console.log(req.file.path);
      });
    
      User.update({username: req.user.username},{
        avatar: s3res.Location
      }, (err) => {
        if(err){
          console.log(err);
        }
        else{
          res.json({avatarURL: s3res.Location});
        }
      });
      
    }
    catch(err){
      console.log(err);
      res.status(422).json({err});
    }
  } 
  else {
    res.send({message: "Please, log in first!"});
  }
  
});

// my middleware for error handling
app.use(function(err, req, res, next) {
  // avatar wrong type upload
  if(err.code === "WRONG_IMG_FILE_TYPE"){
    console.log('BE: Only .jp(e)g, .png or .gif files are allowed');
    res.status(422).json({error: 'BE: Only .jp(e)g, .png or .gif files are allowed'});
    return;
  }
  // avatar too large file upload
  if(err.code === "LIMIT_FILE_SIZE"){
    res.status(422).json({error: `BE: Too large file. Max size is ${MAX_IMG_SIZE/1000}Kb`});
    console.log(`BE: Too large file. Max size is ${MAX_IMG_SIZE/1000}Kb`);
    return;
  }
});
////////////////

app.post('/login',  passport.authenticate('local'), (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log("inside login");
    res.send({username: req.user.username, message: "You logged in successfully!"});
});

app.post('/profile',  (req, res) => {
  if(req.isAuthenticated()){
    let userAvatarURL = '';
    console.log('looking for user in DB');
    console.log(req.user.username);
    
    User
    .find({
      username: req.user.username
    })
    .then((users) => {
      console.log(users[0]);
      if(users.length != 0){
        console.log(users[0].avatar);
        userAvatarURL = users[0].avatar;
      }
      res.send({username: req.user.username, message: "", avatarURL: userAvatarURL});
    });
  } 
  else {
    res.send({message: "Please, log in first!"});
  }
});

app.get('/profile/myposts',  (req, res) => {
  console.log("inside profile/myposts");
  if(req.isAuthenticated()){
    Post
    .find({
      author: req.user.username
    })
    .then((posts) => {
      console.log(posts[0]);
      res.send(posts);
    });
  } 
  else {
    res.send({message: "Please, log in first!"});
  }
});

app.delete('/profile/post/:id',  async (req, res) => {
  console.log("inside delete profile/post/" + req.params.id);
  if(req.isAuthenticated()){
    try{
      console.log("inside if");
      let post = await Post.findOne({_id: req.params.id});
      await post.remove();
      res.send({message: "Post was deteted successfully!"});
    }
    catch(err) {
      console.log(err);
    }
  } 
  else {
    res.send({message: "Please, log in first!"});
  }
});

app.post('/profile/newpost',  (req, res) => {
  const post_title = req.body.post_title;
  const post_text = req.body.post_text;
  console.log('inside new post');
  console.log('post_title: ' + post_title);
  console.log('post_text: ' + post_text);
  console.log(req.isAuthenticated());
  if(req.isAuthenticated()){
    Post.create({
      author: req.user.username,
      title: post_title,
      post: post_text
    }).then(function(post){
      console.log('inside post created: ' + post_text);
      res.send({post_id: post._id});
    });
  } 
  else {
    
    res.send({message: "Please, log in first!"});
  }
});

app.post('/logout', (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    console.log("inside logout");
    req.logout();
    req.session.destroy();
    res.send({message: "You logged out successfully!"});
});

app.get('/posts',  async (req, res) => {
  let i, posts, user;
  let postRes = [];
  try {
    posts = await Post.find();
    for(i = 0; i < posts.length; i++){
      try {
        user = await User.findOne({username: posts[i].author});
        console.log('1111111111111111111111111111111111111111111111');
        console.log(i);
        console.log(user.avatar);
        postRes.push({post: posts[i], authorAvatar: user.avatar});  
      }
      catch(err) {
        console.log(err);
      }
    }
    res.json(postRes);
  }
  catch(err) {
    console.log(err);
  }
});

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(user_id, done) {
  User.findById(user_id, function(err, user) {
    done(err, user);
  });
});

// start server, listening for requests on port 8080 
// or environment port provided by hosting service (e.g. Heroku)
const port = process.env.PORT || 8080;
app.listen(port, function(){
  console.log('Listening on port:' + port);
});

