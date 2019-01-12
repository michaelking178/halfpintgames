const express = require('express');

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', function(req, res){
    res.redirect("/index");
});

app.get("/index", function(req, res){
    res.render("index");
});

// Port
let port = process.env.PORT;
if (port == null || port == ""){
    port = 3000;
}
app.listen(port, function(){
    console.log("Server started...")
});
