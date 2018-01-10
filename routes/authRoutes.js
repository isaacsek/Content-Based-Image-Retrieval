const passport = require("passport");

module.exports = (app) => {
    // callback url after logged in
    app.get('/auth/google', passport.authenticate('google', {
            // give access  to these fields from google
            scope: ['profile', 'email']
        })
    );

    // we have code, diff process
    app.get("/auth/google/callback", passport.authenticate('google'), function(req, res) {
        // after successful login from passport, redirect to here
        res.redirect("/surveys");
    });

    app.get("/api/current_user", function(req, res) {
        res.send(req.user);
    });

    app.get("/api/logout", function(req, res) {
        req.logout();
        res.redirect("/");
    });
}
