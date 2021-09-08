const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.list(res)
    })

    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.listById(res, id)
    })

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.create(atendimento, res)
        // res.send('Atendimento cadastrado!')
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body
        Atendimento.update(id, res, valores)
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Atendimento.delete(id, res)
    })
}


