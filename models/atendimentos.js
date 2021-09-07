const moment = require('moment')
const connection = require('../infrastructure/connection')

class Atendimento {
    create(atendimento, response){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD')

        const isValidDate = moment(data).isSameOrAfter(dataCriacao)
        const isValidName = atendimento.cliente.length >= 5

        const validations = [
            {
                field: 'data',
                valid: isValidDate,
                message: 'Data deve ser maior ou igual que a data atual'
            },
            {
                field: 'cliente',
                valid: isValidName,
                message: 'Nome deve ter pelo menos 5 caracteres'
            }
        ]

        const errors = validations.filter(campo => !campo.valid)
        const existeErrors = errors.length

        if (existeErrors) {
            response.status(400).json(errors)
        } else {
            const atendimentoWithData = {...atendimento, dataCriacao, data}

            const insert = 'INSERT INTO atendimentos SET ?'

            connection.query(insert, atendimentoWithData, (error, result) => {
                if (error) {
                    response.status(400).json(error)
                } else {
                    response.status(201).json(result)
                }
            })
        }
    }
}

module.exports = new Atendimento
