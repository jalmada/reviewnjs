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

addNote = (categoryName, noteToInsert, next) => {
    database.GetDb((err, db) => {
        if(err){
            next(err, null);
        } else {
            db.notes.updateOne({name: categoryName}, {$push: {notes: noteToInsert}}, next);
        }
    });
}

createNewCategory = (categoryName, next) => {
    database.GetDb((err, db) => {
        if(err){
            next(err, null);
        } else {

            db.notes.find({name: categoryName}).count((err, count) => {
                if(err){
                    next(err, null);
                } else {
                    if(count != 0){
                        next("category Already exists");
                    } else {
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
                }
            });
        }
    });
};

getNotes = (categoryName, next) =>{
    database.GetDb((err, db) => {
        if(err){
            next(err);
        } else {
            db.notes.findOne({name: categoryName}, next);
        }
    });
}

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
    createNewCategory: createNewCategory,
    getNotes: getNotes,
    addNote: addNote
};