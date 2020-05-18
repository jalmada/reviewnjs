
var data = require("../data");
var auth = require("../auth");

HomeController = (app) => {
    app.get("/",(req, res) => {
        //res.send(`Hola ${req.url}`);

        data.getNoteCategories((err, result) => {
            res.render("./index", {
                title: "Trying Varsh", 
                user:  req.user, 
                error: err, 
                categories: result,
                newCatError: req.flash("newCatError"),
            });
        });
    });

    

    app.post("/newCategory", (req, res) => {
        var categoryName = req.body.categoryName;

        data.createNewCategory(categoryName, (err) => {
            if(err){
                console.log(err);
                req.flash("newCatError", err);
                res.redirect("/");
            } else {
                res.redirect(`/notes/${categoryName}`);
            }
        });
    });

    app.post("/newNote/:categoryName", (req, res) => {
        var categoryName = req.params.categoryName;
        var noteToInsert = {
            note: req.body.note,
            name: req.body.name,
            color: req.body.color,
            author: req.body.author
        };

        data.addNote(categoryName, noteToInsert, (err) => {
            if(err){
                console.log(err);
                req.flash("newNoteError", err);
            } 

            res.redirect(`/notes/${categoryName}`);
        });
    });

    app.get("/notes/:categoryName", 
        auth.ensureAuthenticted,
        (req, res) => {
        var categoryName = req.params.categoryName;
        data.getNotes(categoryName, (err, data) => {
            if(err){
                console.log(err);
            } else {
                res.render("./notes",{title: categoryName, notes: data.notes, user: req.user});
            }
        });
    });
}

module.exports = HomeController;