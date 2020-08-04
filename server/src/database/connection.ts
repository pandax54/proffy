// aula 02 57:00
import knex from 'knex';
import path from 'path';

// migrations - controlam versao no banco de dados
// yarn knex - comandos do knex

const db = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite')
    },
    useNullAsDefault: true,
});

export default db;