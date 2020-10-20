// the middleware code to check if the user is logged in
// before granting access to the next middleware/route handler

const jwt = require("jsonwebtoken");
const { jwtSecret } = require('../api/config.js');

module.exports = (req, res, next) => {

    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({token_is: "invalid"})
            } else {
                req.jwt = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ message: "Token required to access this endpoint"})
    }
}