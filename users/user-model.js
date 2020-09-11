const db = require("../data/config");

function find () {
    return db("users")
}

function findById(id) {
    return db("users").where({id}).first()
}

async function add(data) {
    const [id] = await db("users").insert(data)
    return findById(id)
}

function remove(id) {
    return db("users").where({id}).del()
}

module.exports = {
    find,
    findById,
    add,
    remove
};