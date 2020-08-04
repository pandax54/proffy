import Knex from 'knex';

// http://knexjs.org/#Installation-migrations
// http://knexjs.org/#Migrations-API 

export async function up(knex: Knex) {
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        // criaremos um relacionamento com a tabela users
        // aula 02 1:19:00
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('classes')
}