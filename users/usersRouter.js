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

router.get("/:id/potlucks", (req, res) => {
    const { id } = req.params;

    Users.findPotlucksByUserId(id)
        .then(potlucks => {
            if(potlucks) {
                res.status(200).json(potlucks)
            }
            else {
                res.status(404).json({message: "Could not find any potlucks associated with the given User ID"})
            }
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
})

router.get("/:id", (req, res) => {

    const { id } = req.params

    Users.findUserbyId(id)
        .then(user => {
            if(user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "Could not find user with that ID"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "Error fetching user. Try again."})
        })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    Users.removeUser(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).json({successfully_removed: deleted})
            } else {
                res.status(404).json({ message: "Could not find user with that ID"})
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error deleting user. Try again."})
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Users.findUserbyId(id)
        .then(user => {
            if (user) {
                Users.updateUser(changes, id)
                .then(updatedUser => {
                    res.status(200).json(updatedUser);
                });
            } else {
                res.status(404).json({ message: "Could not find user with that ID"})
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error updating user. Try again."})
        })
        
})



module.exports = router;