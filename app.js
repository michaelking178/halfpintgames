const express = require('express');

const app = express();
app.use(express.static('/public'));

// Routes
app.get('/', function(req, res){
    app.redirect("/index");
});

app.get("/index", function(req, res){
    app.render("index");
});

// Port
let port = process.env.PORT;
if (port == null || port == ""){
    port = 3000;
}
app.listen(port);
