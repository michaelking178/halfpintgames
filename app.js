const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const sendGrid = require('./api');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Routes
app.get('/', function(req, res){
    res.redirect("/index");
});

app.get("/index", function(req, res){
    res.render("index", contactMsg="");
});

// Port
let port = process.env.PORT;
if (port == null || port == ""){
    port = 3000;
}
app.listen(port, function(){
    console.log("Server started...")
});
