const { table } = require("../config");

exports.up = async function(knex) {
await knex.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("userName").notNull().unique()
    table.text("name")
    })   
};

exports.down = async function(knex) {
await knex.schema.dropTableIfExists("users");
};
