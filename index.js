const express = require('express');
const cookieSesssion = require("cookie-session");
const passport = require("passport");
const bodyParser = require("body-parser");

// create collection of users
const mongoose = require("mongoose");
const keys = require("./config/keys");

require("./models/user");
const passportConfig = require("./services/passport");
const authRoutes = require("./routes/authRoutes");
const billingRoutes = require("./routes/billingRoutes");


mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json()); // parse body and assign it to the req.body
// use cookied
app.use(
    cookieSesssion({
        // use for only 30 days
        maxAge: 30 * 24 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session()); // tell passport to use cookies


// Route handling
authRoutes(app);
billingRoutes(app);

// app.get("/", (req, res) => {
//     res.send({hello: 'world'});
// })

if(process.env.NODE_ENV === "production") {
    // express serve production assets
    app.use(express.static("client/build"));

    // express will serve index, if no route found
    // this is catch all
    const path = require("path");
    app.get("*", function(req, res) {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
