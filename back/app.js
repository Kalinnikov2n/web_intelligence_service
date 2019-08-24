let express = require('express')
let morgan = require('morgan')
let fetch = require('node-fetch')
let app = express()
const path = require('path');
const User = require('./models/user');
const Q = require('./models/question');
const Game = require('./models/game');
const Cat = require('./models/category');
const Round = require('./models/round');
const port = 3101;
const cookieParser = require('cookie-parser');
let session = require('express-session')
const FileStore = require("session-file-store")(session)
const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/game', { useNewUrlParser: true });
const bcrypt = require("bcrypt")


let sessionConfig = {
  secret: 'keyboard cat',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new FileStore({})
}
app.use(cookieParser());
app.use(session(sessionConfig))
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded());

const corsMiddleware = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", "true")
  next();
}

app.use(corsMiddleware)

app.post('/', function(req, res){
  // req.session.user= "niji";
  console.log(req.cookies)
  console.log(req.session.user)
  if(req.session){
  res.json({
    user :req.session.user
  })}
  else{
    res.json({
      user: false
    })
  }
})

app.post('/reg', async function (req, res) {
  let user = new User({
    login: req.body.login
  })
  user.password = user.createHash(req.body.password);
  req.session.user = user.login;
  await user.save();
  console.log(user)
  res.json({user:req.session.user})
});

app.post('/log', async function(req, res) {
  let user = await User.findOne({ login: req.body.login })
    if (user) {
        if (user.checkHash(req.body.password)) {
            req.session.user = user.login
            console.log(req.cookies)
            console.log(req.session.user)
            res.json({
                mes: false,
                user: req.session.user
            });
        }
        else {
            res.json({
                mes: "Неправильный пароль"
            })
        }
    }
    else {
        res.json({
            mes: "неправильный логин"
        })
    }
})

app.get("/logout", function (req, res) {
  req.session.destroy();
  res.end();
})



app.get("/login", function (req, res) {
 req.session.user = "niki";
  console.log(req.session.user)
  res.end();
})


app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
});
