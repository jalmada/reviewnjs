var seedData = require("./seedData");
var database = require("./database");

getNoteCategories = (next) => {
    //console.log(seedData.seedData.InitialNotes);
    next(null, seedData.InitialNotes);
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