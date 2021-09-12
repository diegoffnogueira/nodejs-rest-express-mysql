const moment = require('moment')
const repositorie = require('../repositories/atendimento')
const axios = require('axios');

class Atendimento {

    constructor() {
        this.isValidDate = ({data, dataCriacao}) => moment(data).isSameOrAfter(dataCriacao)
        this.isValidName = ({tamanho}) => tamanho === 11
        this.isValid = parametros =>
            this.validations.filter( campo => {
                const { field } = campo
                const parametro = parametros[field]
                return  !campo.valid(parametro)
            })
        this.validations = [
            {
                field: 'data',
                valid: this.isValidDate,
                message: 'Data deve ser maior ou igual que a data atual'
            },
            {
                field: 'cliente',
                valid: this.isValidName,
                message: 'O CPF deve ter 11 digitos'
            }
        ]
    }

    create(atendimento){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD')
        const parametros = {
            data: {data, dataCriacao},
            cliente: {tamanho: atendimento.cliente.length}
        }

        const errors =  this.isValid(parametros)
        const existeErrors = errors.length

        if (existeErrors) {
            return new Promise((resolve, reject) => {reject(errors)})
        } else {
            const atendimentoWithData = {...atendimento, dataCriacao, data}

            return repositorie.create(atendimentoWithData).then( result => {
                const id = result.insertId
                return { ...atendimentoWithData, id }
            })
        }
    }

    list() {
        return repositorie.list().then(async results => {

            let lista = []

            for (const result of results) {
                const atendimento = result
                const cpf = atendimento.cliente
                const {data} = await axios.get(`http://localhost:8082/${cpf}`)

                atendimento.cliente = data

                lista.push(atendimento)
            }

            return lista
        })
    }

    listById(id){
        return repositorie.listById(id).then(async results => {
            const atendimento = results[0]
            const cpf = atendimento.cliente
            const {data} = await axios.get(`http://localhost:8082/${cpf}`)

            atendimento.cliente = data

            return {atendimento}
        })
    }

    async update(id, valores) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD')
        }

        const cpf = valores.cliente
        const {data} = await axios.get(`http://localhost:8082/${cpf}`)

        return repositorie.update(id, valores).then( () => {

            valores.cliente = data
            return {...valores, id}
        })
    }

    delete(id){
        return repositorie.delete(id).then( result => {
            return { id }
        })
    }
}

module.exports = new Atendimento()
