
var data = require("../data");

HomeController = (app) => {
    app.get("/",(req, res) => {
        //res.send(`Hola ${req.url}`);

        data.getNoteCategories((err, result) => {
            res.render("./index", {title: "Trying Vash", user: "xaratustra", error: err, categories: result});
        });
    });
}

module.exports = HomeController;