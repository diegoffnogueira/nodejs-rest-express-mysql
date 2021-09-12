const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.list().then( resultados => res.json(resultados)).catch(erros => res.status(400).json(erros))
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.listById(id).then( resultados => res.json(resultados)).catch(erros => res.status(400).json(erros))
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.create(atendimento)
            .then( atendimentoCadastrado => {
            res.status(201).json(atendimentoCadastrado)
        }).catch( erros => {
            res.status(400).json(erros)
        })
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        Atendimento.update(id, valores).then( atendimento => {
            res.status(201).json(atendimento)
        }).catch( erros => {
            res.status(400).json(erros)
        })
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.delete(id).then( id => {
            res.status(201).json(id)
        }).catch( erros => {
            res.status(400).json(erros)
        })
    })
}


