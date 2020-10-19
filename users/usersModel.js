const db = require("../data/dbConnection.js");

module.exports = {
    findUsers,
    findUserBy,
    findUserbyId,
    addUser,
    removeUser,
    updateUser
};

function findUsers() {
    return db("users")
            .select("id", "username")
            .orderBy("id")
};

function findUserbyId(id) {
    return db("users")
    .where({id})
    .select("id", "first_name", "last_name", "email", "username")
    .first();
};

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

function removeUser(id) {
    return db("users").where({id}).del()
}

function updateUser(changes, id) {
    return db("users").where({id}).update(changes)
}