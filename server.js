var http = require("http");
var express = require("express");
//var ejsEngine = require("ejs-locals");



var app = express();

//app.set("view engine","jade");
//app.engine("ejs", ejsEngine);
//app.set("view engine","ejs");
app.set("view engine","vash");


app.get("/",(req, res) => {
    //res.send(`Hola ${req.url}`);
    res.render("./index", {title: "Trying Vash", user: "xaratustra"});
});

app.get("/users",(req, res) => {
    res.set("Content-Type", "application/json");
    res.json({user: "jose", id: "123"});
});

var server = http.createServer(app);



server.listen(3000);