var data = require("../data");

auth = (app) => {

    app.get("/register",(req,res) => {
        res.render("./register",{title: "Register with the Board", message: req.flash("registrationError")});
    });

    app.post("/register", (req, rs) =>{
        var user = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            passwordHash: "",
            salt: ""
        };

        data.addUser(user, (err) => {
            if(err){
                req.flash("registrationError","Could not save user to db");
                res.redirect("/register");
            } else {
                res.redirect("/login");
            }
        });
    });
}

module.exports = auth;