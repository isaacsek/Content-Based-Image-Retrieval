// next = done callback, call the next middleware in the chain
module.exports = function(req, res, next) {
        if(!req.user) {
            // 400 status = forbidden
            return res.status(401).send({error: "You must log in!"});

            // dont have to call next since want to return
        }

        next(); // looks good continue on
}
