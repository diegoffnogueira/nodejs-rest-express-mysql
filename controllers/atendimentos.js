const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => res.send('Você está na rota de atendimentos com GET'))

    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body
        Atendimento.create(atendimento, res)
        // res.send('Atendimento cadastrado!')
    })
}


