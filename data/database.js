
var mongoClient = require("mongodb").MongoClient;
var mongoUrl = "mongodb://localhost:27017";
var theDb = null;

const getDb = (next) => {
    if(!theDb){
        mongoClient.connect(mongoUrl, {useUnifiedTopology: true},(err, client) => {
            if(err){
                next(err, null);
            } else {
                let db = client.db("theBoard");
                theDb = {
                    db: db,
                    notes: db.collection("notes")
                };
                next(null, theDb);
            }
            
        });
    } else {
        next(null, theDb);
    }
};

module.exports = {
    GetDb: getDb
};