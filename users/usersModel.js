const db = require("../data/dbConnection.js");

module.exports = {
    findUsers,
    findUserBy,
    findUserbyId,
    addUser,
    removeUser,
    updateUser,
    findPotlucksByUserId
};

function findUsers() {
    return db("users")
            .select("id", "username", "first_name", "last_name", "email")
            .orderBy("id")
};

function findUserbyId(id) {
    return db("users")
    .where({id})
    .select("id", "username", "first_name", "last_name", "email")
    .first();
};

// this endpoint works but I need to play around with what it returns
function findPotlucksByUserId(id) {
    return db("users")
    .where("users.id",'=', id)
    .join("users_potlucks", "users.id", '=', "users_potlucks.user_id")
    .join("potlucks", "users_potlucks.potluck_id", '=', 'potlucks.id')
    .select("user_id", "potluck_id", "event_name", "event_address", "attending", "role")
}

function findUserBy(filter) {
    return db("users")
        .where(filter)        
}

function addUser(user) {
    return db('users')
        .insert(user, "id")
        .then(ids => {
            const id = ids[0]
            return findUserbyId(id)
        })
}

function organizeAPotluck(potluck) {}

function removeUser(id) {
    return db("users").where({id}).del()
}

function updateUser(changes, id) {
    return db("users").where({id}).update(changes)
}