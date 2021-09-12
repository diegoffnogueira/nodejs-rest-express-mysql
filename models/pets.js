const connection = require('../infrastructure/database/connection')
const upload = require('../infrastructure/arquivos/uploadDeArquivos')

class Pets{
    create(pet, response){
        const sql = 'INSERT INTO pets SET ?'

        upload(pet.imagem, pet.nome, (erro, newPath) => {

            if (erro) {
                response.status(400).json({ erro })
            } else {
                const newPet = {nome: pet.nome, imagem: newPath}

                connection.query(sql, newPet, (error, result) => {
                    if (error) {
                        response.status(400).json(error)
                    } else {
                        response.status(201).json(newPet)
                    }
                })
            }
        })
    }
}

module.exports = new Pets()
