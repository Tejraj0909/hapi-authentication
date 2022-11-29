/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {

    return knex.schema.createTable('users',function  (table) {

        table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.text('email', 255).unique().notNullable();
        table.text('password', 255).notNullable();
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {

    return knex.schema.dropTable('users');
};
