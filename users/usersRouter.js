const router = require('express').Router();
const Users = require("./usersModel.js");
const Potlucks = require("../potlucks/potluckModel.js");
const Users_Potlucks = require("../potlucks/users_potlucksModel.js");

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

router.get("/:user_id", (req, res) => {

    const { user_id } = req.params

    Users.findUserbyId(user_id)
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

router.post("/:user_id/potlucks", (req, res) => {
    const { user_id } = req.params;

    const potluckInfo = req.body;

    Potlucks.addPotluck(potluckInfo)
    .then(potluck => {
        const additionalInfo = {
            user_id: user_id,
            potluck_id: potluck.id,
            attending: 1,
            role: "organizer"
        }
        Users_Potlucks.addUsers_Potlucks(additionalInfo)
        .then(info => {
            res.status(201).json({newPotluck: potluck, organizerInfo: info})
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
    })
    .catch(error => {
        res.status(500).json({ message: error.message})
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

// this doesn't work
router.put("/:id/potlucks/:potluck_id", (req, res) => {
    const {id, potluck_id} = req.params;
    const changes = req.body;

    Users_Potlucks.findInviteByPotluckAndUser({user_id: id, potluck_id: potluck_id})
    .then(invites => {
        if(invites) {
            const invite = invites[0]
            Users_Potlucks.editUsers_Potlucks(changes, invite.id)
            .then(updatedInvite => {
                res.status(200).json({ message: "successfully updated"});
            })
            .catch(error => {
                res.status(404).json("Could not find potluck invite matching that user and event")
            })
        } else {
            res.status(404).json({message: "Could not find invite that meets those specifications "})
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message})
    })

})


router.get("/:id/potlucks/:potluck_id", (req, res) => {
    const { id, potluck_id } = req.params;

    Users.findPotlucksByUserId(id)
        .then(potlucks => {
            if (potlucks) {
                Potlucks.findPotluckById(potluck_id)
                .then(potluck => {
                    if(potluck) {
                        res.status(200).json(potluck)
                    } else {
                        res.status(404).json({message: "Could not find potluck with that ID"})
                    }
                })
                .catch(error => {
                    res.status(500).json({message: error.message})
                })
            } else {
                res.status(404).json({ message: "Could not find user with that ID"})
            }
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
        
})




router.get("/:id/potlucks/:potluck_id/items", (req, res) => {
    const {id, potluck_id} = req.params
    Users.findPotlucksByUserId(id)
        .then(potlucks => {
            if(potlucks) {
                Potlucks.findItemsByUserAndPotluckId(id, potluck_id)
                .then(items => {
                    if(items) {
                        res.status(200).json(items)
                    }
                    else {
                        res.status(404).json({message: "Could not find any items associated with the given Potluck ID"})
                    }
                })
                .catch(error => {
                    res.status(500).json({message: error.message})
                })
            }
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    Users.removeUser(id)
        .then(deleted => {
            if (deleted) {
                res.status(204).json({message: "User was destroyed"})
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
                })
                .catch(error => {
                    res.status(500).json({message: error.message})
                })
            } else {
                res.status(404).json({ message: "Could not find user with that ID"})
            }
        })
        .catch(error => {
            res.status(500).json({ message: "Error updating user. Try again."})
        })
        
})



module.exports = router;