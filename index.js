const express = require('express')
const app = express()
const db = require('./queries')
const port = 5000

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

app.get('/persons', db.getPersons)
app.get('/persons/:id', db.getPersonById)
app.post('/persons', db.createPerson);
app.put('/persons/:id', db.updatePerson)
app.delete('/persons/:id', db.deletePerson)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

