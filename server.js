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
    var sql = require("mssql/msnodesqlv8"); 
    //var connStr = "Server=localhost\\SQLEXPRESS;Database=test;Trusted_Connection=True;";

    var dbConfig = {    
        driver: 'msnodesqlv8',
        connectionString:'Driver={SQL Server Native Client 11.0};Server={localhost\\SQLEXPRESS};Database={test};Trusted_Connection={yes};'
    };

    // connect to your database
    sql.connect(dbConfig, (err) => {

        if(err){
            res.send(err);
            sql.close();
        } else {
            var request = new sql.Request();
            request.query("Select * from Customer", (err, result) =>{
                
                if(err){
                    res.send(err);
                } else {
                    res.send(result);
                }
            });
        }
    });
});

var server = http.createServer(app);

server.listen(3000);