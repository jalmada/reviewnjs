var data = require('../data');

NotesController = (app) => {
    app.get("/api/notes/:categoryName", (req, res) => {

        var categoryName = req.params.categoryName;

        data.getNotes(categoryName, (err, notes) => {
            if(err){
                res.send(400, err);
            } else {
                res.set("Content-Type", "application/json");
                res.send(notes);
            }
        });
    });

    app.post("/api/notes/:categoryName", (req, res) => {
        var categoryName = req.params.categoryName;
        var noteToInsert = {
            note: req.body.note,
            name: req.body.name,
            color: req.body.color,
            author: req.body.author,

        };

        data.addNote(categoryName, noteToInsert, (err) => {
            if(err){
                res.send("400", "Failed to Add note");
            } else {
                res.set("Content-Type", "application/json");
                res.status(201).send(noteToInsert);
           }
        });
    });
};

module.exports = NotesController;