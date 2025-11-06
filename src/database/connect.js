const mongoose = require('mongoose');;

const connectToDB = async () =>
{
  try {
    // Tenta conectar. A 'string_de_conexao' geralmente vem de um .env
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@database.i46a2ti.mongodb.net/`); // Substitua pela sua string ou variável de ambiente
    
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.log('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Opcional: Encerra a aplicação se não conseguir conectar ao DB
  }
};

module.exports = connectToDB;