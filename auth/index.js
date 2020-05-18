var data = require("../data");
var hasher = require('./hasher');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

userVerify = (username, password, next) => {
    data.getUser(username, (err, user) => {

        if(!err && user){
            var testhash = hasher.computeHash(password, user.salt);
            if(testhash == user.passwordHash){
                next(null, user);
                return;
            }
        }

        next(null, false, {message: "Invalid Credentials"});
    });
};

ensureAuthenticted = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.redirect("/login");
    }
};

ensureApiIsAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(401).send("Not Authorized");
    }
};

auth = (app) => {

    passport.use(new localStrategy(userVerify));
    passport.serializeUser((user, next) => {
        next(null, user.username);
    });
    passport.deserializeUser((key, next) => {
        data.getUser(key, (err,user) => {
            if(err) {
                next(null, false, {message: "Failed to retrieve user"});
            } else {
                next(null, user);
            }
        });
    });
    
    app.use(passport.initialize());
    app.use(passport.session());

    app.get("/register",(req,res) => {
        res.render("./register",{title: "Register with the Board", message: req.flash("registrationError")});
    });

    app.post("/register", (req, res) =>{
        var salt = hasher.createSalt();

        var user = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            passwordHash: hasher.computeHash(req.body.password, salt),
            salt: salt
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

    app.get("/login",(req,res) => {
        res.render("./login",{title: "Login with the Board", message: req.flash("loginError")});
    });

    app.post("/login", (req, res, next) =>{
        var authFunction = passport.authenticate("local", (err, user, info) => {
            if(err){
                next(err);
            } else {
                req.logIn(user, (err) => {
                    if(err){
                        next(err);
                    } else {
                        res.redirect("/");
                    }
                })
            }
        });

        authFunction(req, res, next);
    });
}

module.exports = { 
    auth: auth,
    ensureAuthenticted: ensureAuthenticted,
    ensureApiIsAuthenticated: ensureApiIsAuthenticated
};