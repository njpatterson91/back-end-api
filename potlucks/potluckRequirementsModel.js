const db = require("../data/dbConnection.js");

module.exports = {
    findAllItems,
    findItemById,
    editItem,
    removeItem,
    addItem
};

function findAllItems() {
    return db('potluck_requirements').orderBy("id")
}

function findItemById(id) {
    return db('potluck_requirements').where({id}).first()
}

function addItem(item) {
    return db('potluck_requirements')
        .insert(item, 'id')
        .then(ids => {
            const id = ids[0]
            return findItemById(id)
        })
}

function editItem(changes, id) {
    return db("potluck_requirements").where({id}).update(changes)
}

function removeItem(id){
    return db("potluck_requirements").where({id}).del();
}