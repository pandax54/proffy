import Knex from 'knex';

// http://knexjs.org/#Installation-migrations
// http://knexjs.org/#Migrations-API 

export async function up(knex: Knex) {
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();

        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        // aula 02 1:24:00
        table.timestamp('created_at')
            // 'CURRENT_TIMESTAMP' == now()
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('connections')
}