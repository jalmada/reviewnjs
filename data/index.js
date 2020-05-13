var seedData = require("./seedData");
var database = require("./database");

getNoteCategories = (next) => {
    database.GetDb((err, db) => {
        if(err){
            next(err, null);
        } else {
            db.notes.find().sort({name: 1}).toArray((err, result) => {
                if(err) {
                    next(err, null);
                } else {
                    next(null, result);
                }
            });
        }
    });
};

createNewCategory = (categoryName, next) => {
    database.GetDb((err, db) => {
        if(err){
            next(err, null);
        } else {

            db.notes.
            var cat = {
                name: categoryName,
                notes: []
            };

            db.notes.insertOne(cat, (err)=> {
                if(err){
                    next(err);
                } else {
                    next(null);
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
    getNoteCategories : getNoteCategories,
    createNewCategory: createNewCategory
};