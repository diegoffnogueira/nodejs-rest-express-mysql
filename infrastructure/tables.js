class Tables {
    init(connection){
        this.connection = connection
        this.criarAtendimentos()
        this.criarPets()
    }

    criarAtendimentos(){
        const sql = 'CREATE TABLE IF NOT EXISTS atendimentos(' +
            'id int NOT NULL AUTO_INCREMENT,' +
            'cliente VARCHAR(50) NOT NULL,' +
            'pet VARCHAR(20),' +
            'servico VARCHAR(20) NOT NULL,' +
            'status VARCHAR(20) NOT NULL,' +
            'data datetime NOT NULL,' +
            'dataCriacao datetime NOT NULL,' +
            'observacoes text,' +
            'PRIMARY KEY(id))'

        this.connection.query(sql, error => {
            if (error) {
                console.log(error)
            } else {
                console.log('Tabela atendimentos criada!')
            }
        })
    }

    criarPets(){
        const sql = 'CREATE TABLE IF NOT EXISTS pets(' +
            'id int NOT NULL AUTO_INCREMENT,' +
            'nome VARCHAR(50),' +
            'imagem VARCHAR(200),' +
            'PRIMARY KEY(id))'

        this.connection.query(sql, error => {
            if (error) {
                console.log(error)
            } else {
                console.log('Tabela pets criada!')
            }
        })
    }
}

module.exports = new Tables
