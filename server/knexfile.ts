// aula 03 - 1:04:00 para o knex funcionar com typescript
// aula 03 - 1:13:00 package.json script
import path from "path";

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true,
};

