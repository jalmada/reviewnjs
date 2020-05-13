
var data = require("../data");

HomeController = (app) => {
    app.get("/",(req, res) => {
        //res.send(`Hola ${req.url}`);

        data.getNoteCategories((err, result) => {
            res.render("./index", {title: "Trying Varsh", user: "xaratustra", error: err, categories: result});
        });
    });


    app.post("/newCategory", (req, res) => {
        var categoryName = req.body.categoryName;

        data.createNewCategory(categoryName, (err) => {
            if(err){
                console.log(err);
                res.redirect("/");
            } else {
                res.redirect(`/notes/${categoryName}`);
            }
        });
    });
}

module.exports = HomeController;