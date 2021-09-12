const fs = require('fs')
const path = require('path')

// fs.readFile('./assets/salsicha.png', (error, buffer) => {
//     console.log('Arquivo foi bufferrizado')
//
//     fs.writeFile('./assets/salsicha2.png', buffer, (error) => {
//         console.log('Arquivo foi salvo')
//     })
// })

module.exports = (filePath, fileName, createImageCallback) => {
    const tiposValidos = ['jpg', 'png', 'jpeg']
    const tipo = path.extname(filePath)
    const tipoEhInvalido = tiposValidos.indexOf(tipo.substring(1)) === -1

    if (tipoEhInvalido) {
        const erro = 'Erro. Tipo de arquivo inválido!'
        createImageCallback(erro)
    } else {
        const newPath = `../../assets/imagens/${fileName}${tipo}`

        fs.createReadStream(filePath)
            .pipe(fs.createWriteStream(newPath))
            .on('finish', () => createImageCallback(false, newPath))
    }


}






