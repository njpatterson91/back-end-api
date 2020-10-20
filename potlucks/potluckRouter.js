const router = require('express').Router();
const Potlucks = require('./potluckModel.js');
const Items = require('./potluckRequirementsModel.js');

router.get("/", (req, res) => {
    Potlucks.findPotlucks()
    .then(potlucks => {
        res.status(201).json(potlucks)
    })
    .catch(error => {
        res.status(500).json({message: "Error fetching potlucks"})
    })
})

router.get("/:id", (req, res) => {

    const { id } = req.params

    Potlucks.findPotluckById(id)
        .then(potluck => {
            if(potluck) {
                res.status(200).json(potluck)
            } else {
                res.status(404).json({ message: "Could not find potluck with that ID"})
            }
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
})


router.post("/:id/guests", (req, res) => {
    const { id } = req.params;
    
    
})

router.get("/:id/guests", (req, res) => {
    const {id} = req.params;
    
    Potlucks.findInvitedUsersByPotluckId(id)
    .then(guests => {
        if(guests) {
            res.status(200).json(guests)
        }
        else {
            res.status(404).json({message: "Could not find any guests associated with the given Potluck ID"})
        }
    })
    .catch(error => {
        res.status(500).json({message: error.message})
    })

})

router.post("/:id/items", (req, res) => {
    const {id} = req.params;

    const itemInfo = {...req.body, potluck_id: id}

    Items.addItem(itemInfo)
        .then(item => {
            res.status(201).json(item)
        })
        .catch(error => {
            res.status(500).json({ message: error.message})
        })
})

router.get("/:id/items", (req, res) => {
    const {id} = req.params

    Potlucks.findItemsByPotluckId(id)
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
})

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    Potlucks.removePotluck(id)
    .then(deleted => {
        if (deleted) {
            res.status(204).json({message: "Potluck destroyed"})
        } else {
            res.status(404).json({ message: "Could not find potluck with that ID"})
        }
    })
    .catch(error => {
        res.status(500).json({ message: error.message})
    })
})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Potlucks.findPotluckById(id)
        .then(potluck => {
            if (potluck) {
                Potlucks.editPotluck(changes, id)
                .then(updatedPotluck => {
                    res.status(200).json(updatedPotluck);
                })
            } else {
                res.status(404).json({message: "Could not find potluck with that ID"})
            }
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })
})

module.exports = router;