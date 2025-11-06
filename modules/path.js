const path = require('path');

// Apenas o nome do arquivo

console.log(path.basename(__filename));

// Nome do diretório atual

console.log(path.dirname(__filename));

// Extensão do arquivo

console.log(path.extname(__filename));

// Diretório do projeto

console.log(path.dirname(__dirname));
