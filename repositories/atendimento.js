const query = require('../infrastructure/database/queries')

class Atendimento {
    create(atendimento) {
        const insert = 'INSERT INTO atendimentos SET ?'

        return query(insert, atendimento)
    }

    list() {
        const get = 'SELECT * FROM atendimentos'

        return query(get)
    }

    listById(id) {
        const sql = 'SELECT * FROM atendimentos WHERE id = ?'

        return query(sql, id)
    }

    update(id, valores) {
        const sql = 'UPDATE atendimentos SET ? WHERE id = ?'

        return query(sql, [valores, id])
    }

    delete(id) {
        const sql = 'DELETE FROM atendimentos WHERE id = ?'

        return query(sql, id)
    }
}

module.exports = new Atendimento()
