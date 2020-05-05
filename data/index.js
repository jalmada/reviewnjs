var seedData = require("./seedData");

getNoteCategories = (next) => {
    //console.log(seedData.seedData.InitialNotes);
    next(null, seedData.InitialNotes);
};

module.exports = {
    getNoteCategories : getNoteCategories
};