var http = require("http");
var express = require("express");
var controllers = require("./controllers");
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//var ejsEngine = require("ejs-locals");



var app = express();

//app.set("view engine","jade");
//app.engine("ejs", ejsEngine);
//app.set("view engine","ejs");
app.set("view engine","vash");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.use(cookieParser());
app.use(session({secret: "PluralsightTheBoard", resave: false, saveUninitialized: true}));
app.use(flash());
controllers.HomeController(app);
controllers.NotesController(app);


app.get("/users",(req, res) => {
    res.set("Content-Type", "application/json");
    res.json({user: "jose", id: "123"});
});


app.get("/api/sql", (req, res) => {
    var sql = require("mssql/msnodesqlv8"); 

    var dbConfig = {    
        driver: 'msnodesqlv8',
        //connectionString:'Driver={SQL Server Native Client 11.0};Server={localhost\\SQLEXPRESS};Database={test};Trusted_Connection={yes};'
        connectionString:'Driver={SQL Server Native Client 11.0};Server={localhost\\SQLEXPRESS01};Database={test};Trusted_Connection={yes};'
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