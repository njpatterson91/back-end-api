const db = require("../data/dbConnection.js");

module.exports = {
    findPotlucks,
    findPotluckById,
    addPotluck,
    editPotluck,
    removePotluck,
    findItemsByPotluckId,
    findItemsByUserAndPotluckId,
    findInvitedUsersByPotluckId
};

function findPotlucks() {
    return db("potlucks").orderBy('id')
}

function findPotluckById(id) {
    return db("potlucks")
        .where({ id })
        .first()
}

function findItemsByPotluckId(id) {
    return db("potlucks as p")
        .where("p.id", '=', id)
        .join("potluck_requirements as pr", "p.id", '=', 'pr.potluck_id')
        .select("pr.id", "pr.potluck_id", "pr.item_category", "pr.item_name", 'pr.item_description', 'pr.item_amount', 'pr.assigned_to_user_id')
}

function findItemsByUserAndPotluckId(user_id, potluck_id) {
    return db("potlucks as p")
        .where("p.id", '=', potluck_id)
        .andWhere("pr.assigned_to_user_id", '=', user_id )
        .join("potluck_requirements as pr", 'p.id', '=', 'pr.potluck_id')
        .select("pr.assigned_to_user_id", 'pr.potluck_id', "p.event_name", "pr.item_category", "pr.item_name", 'pr.item_description', 'pr.item_amount')
}

function findInvitedUsersByPotluckId(potluck_id) {
    return db("users_potlucks as up")
        .where("up.potluck_id", '=', potluck_id)
        .join("users as u", 'up.user_id', '=', 'u.id')
        .select('up.potluck_id', 'up.attending', 'up.user_id', 'u.first_name', 'u.last_name', 'u.email', 'u.username', 'up.role')
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
