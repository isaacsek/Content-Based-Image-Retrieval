const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin");

module.exports = (app) => {
    // only one parameter has to send a response
    app.post("/api/handleStripeToken", requireLogin, async function(req, res) {
        //console.log(req.body);

        // actually charge the credit card
        const charge = await stripe.charges.create({
            amount: 500,
            currency: 'usd',
            description: '$5 for 5 credits',
            source: req.body.id
        });

        req.user.credits += 5;
        const user = await req.user.save();

        //console.log(charge);
        res.send(user); // send updated model back
    });
}
