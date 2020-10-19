const db = require("../data/dbConnection.js");

module.exports = {
    findPotlucks,
    findPotluckById,
    addPotluck,
    editPotluck,
    removePotluck,
    findItemsByPotluckId
};

function findPotlucks() {
    return db("potlucks").orderBy('id')
}

function findPotluckById(id) {
    return db("potlucks").where({ id }).first()
}

function findItemsByPotluckId(id) {
    return db("potlucks as p")
        .where("p.id", '=', id)
        .join("potluck_requirements as pr", "p.id", '=', 'pr.potluck_id')
        .select("p.id", "pr.item_category", "pr.item_name", 'pr.item_description', 'pr.item_amount', 'pr.assigned_to_user_id')
}

function addPotluck(potluck) {
    return db("potlucks")
        .insert(potluck, "id")
        .then(ids => {
            const id = ids[0]
            return findPotluckById(id)
        })
}

function editPotluck(changes, id) {
    return db("potlucks").where({id}).update(changes)
}

function removePotluck(id) {
    return db("potlucks").where({id}).del()
}
