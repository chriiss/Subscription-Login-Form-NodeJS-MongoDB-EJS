
const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const port = 8080
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const path = require("path");
const liveReloadServer = livereload.createServer();
const mongoose = require('mongoose');


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

app.get('/', (req, res) => {
  res.render('home');
})


app.get('/login', (req, res) => {
    res.render('login');
})


app.get('/register', (req, res) => {
    res.render('register');
})

mongoose.connect('mongodb://localhost/my_database')
.then(()=>{
    app.listen(port, ()=>{
        console.log("Database connection is Ready "
        + "and Server is Listening on Port ", port);
    })
})
.catch((err)=>{
    console.log("A error has been occured while"
        + " connecting to database.");
})