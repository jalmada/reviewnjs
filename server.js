var http = require("http");
var express = require("express");
var controllers = require("./controllers");
//var ejsEngine = require("ejs-locals");



var app = express();

//app.set("view engine","jade");
//app.engine("ejs", ejsEngine);
//app.set("view engine","ejs");
app.set("view engine","vash");
app.use(express.static(__dirname + "/public"));

controllers.HomeController(app);


app.get("/users",(req, res) => {
    res.set("Content-Type", "application/json");
    res.json({user: "jose", id: "123"});
});


app.get("/api/sql", (req, res) => {
    var msnodesql = require("node-sqlserver-unofficial")
    var connStr = "Server=localhost\SQLEXPRESS;Database=test;Trusted_Connection=True;";
});
var server = http.createServer(app);



server.listen(3000);