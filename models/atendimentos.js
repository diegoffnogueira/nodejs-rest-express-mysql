const moment = require('moment')
const connection = require('../infrastructure/connection')
const axios = require('axios');

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
                    response.status(201).json(atendimentoWithData)
                }
            })
        }
    }

    list(response){
        const sql = 'SELECT * FROM atendimentos'

        connection.query(sql, (error, result) => {
            if (error) {
                response.status(400).json(error)
            } else {
                response.status(200).json(result)
            }
        })
    }

    listById(response, id){
        const sql = `SELECT * FROM atendimentos WHERE id=${id}`

        connection.query(sql, async (error, result) => {
            const atendimento = result[0]
            const cpf = atendimento.cliente

            if (error) {
                response.status(400).json(error)
            } else {
                const { data } = await axios.get(`http://localhost:8082/${cpf}`)

                atendimento.cliente = data

                response.status(200).json(atendimento)
            }
        })
    }

    update(id, response, valores) {
        const sql = 'UPDATE atendimentos SET ? WHERE id=?'

        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }

        connection.query(sql, [valores, id], (error, result) => {
            if (error) {
                response.status(400).json(error)
            } else {
                response.status(200).json({...valores, id})
            }
        })
    }

    delete(id, response){
        const sql = `DELETE FROM atendimentos WHERE id=${id}`

        connection.query(sql, (error, result) => {
            if (error) {
                response.status(400).json(error)
            } else {
                response.status(200).json({id})
            }
        })
    }
}

module.exports = new Atendimento()
