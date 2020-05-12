var seedData = require("./seedData");
var database = require("./database");

getNoteCategories = (next) => {
    database.GetDb((err, db) => {
        if(err){
            next(err, null);
        } else {
            db.notes.find({notes: {$size: 3}}).sort({name: 1}).toArray((err, result) => {
                if(err) {
                    next(err, null);
                } else {
                    next(null, result);
                }
            });
        }
    });
};

seedDatabase = () => {
    database.GetDb((err, db) => {
        if(err){
            console.log(`Error: ${err}`);
        } else {
            db.notes.countDocuments((err, count) => {
                if(err){
                    console.log(err);
                } else {
                    if(count == 0){
                        
                        seedData.InitialNotes.forEach((note) => {
                            db.notes.insertOne(note, (err)=> {
                                if(err){
                                    console.log(err);
                                }
                            });
                        });
                    }
                }
            });
        }
    });
};

seedDatabase();

module.exports = {
    getNoteCategories : getNoteCategories
};