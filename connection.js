const con = () => {

    const {Client} = require('pg')

    const client = new Client({
        user: 'postgres',
        host: 'localhost',
        database: 'uni_db',
        password: '123123',
        port: 5432,
    });

    client.connect()

    client.query('SELECT NOW()', (err, res) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log('Connection successful');
        client.end()
    });
}
