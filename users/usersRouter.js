const router = require('express').Router();
const Users = require("./usersModel.js");

router.get("/" , (req, res) => {

    Users.findUsers()
    .then(users => {
        if (users.length === 0) {
            res.json({message: "No users registered currently"})
        } else {
            res.status(200).json(users)
        }
    })
    .catch(err => {
        res.send(err.message);
    })
})

module.exports = router;