
const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const port = 8080
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const path = require("path");
const liveReloadServer = livereload.createServer();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/my_db');
const db = mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', (callback) => {
   console.log("connection mongodb ok!");
})
const User = require("./models/user.model");
const bcrypt = require("bcrypt");


liveReloadServer.watch(path.join(__dirname, 'public'))
liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
});


app.use(connectLiveReload());

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/public',express.static('public'));
app.set('view engine', 'ejs');


/* Routes */

app.get('/', (req, res) => {
  res.render('home');
}).listen(3000)


app.get('/login', (req, res) => {
    res.render('login');
})


app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    let data = {
        "name": name,
        "email": email,
        "password": await bcrypt.hash(password, 10)
    }

    db.collection('signup').insertOne(data,function(err, collection){
        if (err) throw err;
           console.log("Record inserted Successfully");
        });
        return res.render('success');

})