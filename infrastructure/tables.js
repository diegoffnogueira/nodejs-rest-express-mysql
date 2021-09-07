class Tables {
    init(connection){
        this.connection = connection
        this.criarAtendimentos()
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
                console.log('Tabelas criadas!')
            }
        })
    }
}

module.exports = new Tables
