const connection = require('./connection')

const executeQuery = (sql, params = '') => {
    return new Promise((resolve, reject) => {
        connection.query(sql, params, (error, result , campos) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

module.exports = executeQuery
