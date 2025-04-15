const mysql2 = require('mysql2');
const sens = require('./sensibili');

const connection = mysql2.createConnection({
    host: sens.host, // localhost
    user: sens.user, // root
    password: sens.password, // password
    database: sens.database // db name
})

connection.connect((err) => {
    if (err) throw console.error('Error mysql2 connected', err)
    console.log('Connected to MySql Databse')
})

module.exports = connection