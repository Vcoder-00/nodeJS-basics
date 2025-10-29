const { error } = require('console');
const fs = require('fs');
const path = require('path');

// criar uma pasta 

// fs.mkdir(path.join(__dirname, '/test'), (error) => {
//     if (error) {
//         return console.log("Erro: ", error)
//     }

//     console.log("Pasta criada com sucesso!")

// });

// criar um arquivo ou sobrescrever um já existente

// fs.writeFile(path.join(__dirname, '/test', 'test.txt'), 'Hello node!', (error) => {
//     if (error) {
//         return console.log("Erro: ", error)
//     }

//     console.log("Arquivo criado com sucesso!")

// });

// // edita e adiciona no arquivo existente

// fs.appendFile(path.join(__dirname, '/test', 'test.txt'), ' Hello World!', (error)=> {
//     if (error) {
//         return console.log("Erro: ", error)
//     }

//     console.log("Arquivo modificado criada com sucesso!");

// });

// fs.readFile(path.join(__dirname, '/test', 'test.txt'), 'utf-8', (error,data) => {
//     if (error) {
//     return console.log('Erro: ', error);
//     }
//     return console.log(data);
// }) // obs essa é a forma incorreta de interagir com essas funções, o resultado resposta no terminal está variavel pois há uma corrida entre fs.writeFile, fs.appendFile, fs.readFile as vezes a ordem de "chegada" (conclusão) deles é certa e o readFile processa 'Hello node! Hello World!' mas as vezes readfile é concluido antes do append e resulta no terminal 'Hello node!'

// forma correta:

// 1. PRIMEIRO, escreva o arquivo
fs.writeFile(path.join(__dirname, '/test', 'test.txt'), 'Hello node!', (error) => {
    if (error) {
        return console.log("Erro: ", error)
    }
    console.log("Arquivo criado com sucesso!")

    // 2. SÓ DEPOIS que o primeiro terminar, adicione ao arquivo
    fs.appendFile(path.join(__dirname, '/test', 'test.txt'), ' Hello World!', (error)=> {
        if (error) {
            return console.log("Erro: ", error)
        }
        console.log("Arquivo modificado criada com sucesso!");

        // 3. E SÓ DEPOIS que o segundo terminar, leia o arquivo
        fs.readFile(path.join(__dirname, '/test', 'test.txt'), 'utf-8', (error,data) => {
            if (error) {
                return console.log('Erro: ', error);
            }
            // Agora sim, a leitura é garantida
            return console.log(data); 
        });
    });
});