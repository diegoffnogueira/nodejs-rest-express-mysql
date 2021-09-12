const mysql = require('mysql2')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'Backoffice'
})

module.exports = connection
