const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'uni_db',
    password: '123123',
    port: 5432,
})

const getPersons = (request, response) => {
    pool
        .query('SELECT * FROM persons ORDER BY id ASC')
        .then(res => {
            console.log('success');
            response.status(200).json(res.rows);
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() =>{
          client.end
        });
}

const getPersonById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT * FROM persons WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const createPerson = (request, response) => {
    pool.connect()
        .then((client) => {
            const { firstName, secondName, fatherName, groupId, type } = request.body

            client.query('INSERT INTO persons (first_name, second_name, father_name, group_id, type) VALUES ($1, $2)', [firstName, secondName, fatherName, groupId, type])
                .then(res => {
                    console.log('res: ' + res)
                })
                .catch(err => {
                    console.error(err);
                });
        })
        .catch(err => {
            console.error(err);
        });

    // pool.query('INSERT INTO persons (first_name, second_name, father_name, group_id, type) VALUES ($1, $2)', [firstName, secondName, fatherName, groupId, type], (error, results) => {
    //     if (error) {
    //         throw error
    //     }
    //     response.status(201).send(`User added with ID: ${result.insertId}`)
    // })
}

const updatePerson = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, email } = request.body

    pool.query(
        'UPDATE persons SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(`User modified with ID: ${id}`)
        }
    )
}

const deletePerson = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('DELETE FROM persons WHERE id = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(`User deleted with ID: ${id}`)
    })
}

module.exports = {
    getPersons,
    getPersonById,
    createPerson,
    updatePerson,
    deletePerson,
}