import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users',function  (table) {

        table.uuid("id").primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.text('email').unique().notNullable();
        table.text('password').notNullable();
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users');
}

