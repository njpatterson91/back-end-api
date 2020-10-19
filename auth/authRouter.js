const router = require('express').Router();
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require('../users/usersModel');
const {isLoginValid, isRegisterValid} = require("../users/userValidation.js");
const { jwtSecret } = require("../api/config");

router.post("/register", (req, res) => {
    const credentials = req.body;

    if(isRegisterValid(credentials)) {
        const rounds = process.env.BCRYPT_ROUNDS || 8;

        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password = hash;

        Users.addUser(credentials)
            .then(user => {
                res.status(201).json(user)
            })
            .catch(error => {
                res.status(500).json({ message: error.message });
            })
    } else {
        res.status(400).json({
            message: "Must provide username, password, and role. The Password should be alphanumeric."
        })
    }
})

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (isLoginValid(req.body)) {
        Users.findUserBy({username: username})
            .then(users => {
                const user = users[0];

                if (user && bcryptjs.compareSync(password, user.password)) {
                    const token = getJwt(user);

                    res.status(200).json({message: "Login Successful", token: token})
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(err => {
                res.status(500).json({ message: err.message })
            })
    } else {
        res.status(400).json({
            message: "Must provide username and password. Password should be alphanumeric. "
        })
    }
})

function getJwt(user) {
    const payload = {
        username: user.username,
        role: user.role
    }
    const jwtOptions = {
        expiresIn: '8h'
    }

    return jwt.sign(payload, jwtSecret, jwtOptions);
}   

module.exports = router;