const express = require('express');
const UserModel = require('../src/models/user.model');
const app = express();

app.use(express.json())// middleware (não obrigatório, mas essencial): express vai reconhecer que as requisições sempre serão feitas em JSON

app.use((req, res, next) => { //middleware (opcional): seta uma mensagem para cada requisição ao servidor
    console.log(`Request type: ${req.method}`);
    console.log(`Content type: ${req.headers["content-type"]}`);
    console.log(`Request type: ${new Date()}`);

    next();// sem o next a requisição o restante do código "travaria"
})

const port = 8080;

app.get('/home', (req, res) => {
    res.contentType("text/html");
    res.status(200).send("<h1>Hello World</h1>");
});

app.get("/users", async (req, res) => { // listar usuarios
    try {
        const users = await UserModel.find({});

        res.status(200).json(users);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
})

app.get("/users/:id", async (req, res) => {// Read um usuario com base no id
    try {
        const id = req.params.id;
        const user = await UserModel.findById(id);

        res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).send(error.message);
    }
});

app.post('/users', async (req, res) => { //create do novo usuario
    try {
        const user = await UserModel.create(req.body); // create é promise por isso uso do async e try/catch

        res.status(201).json(user);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message }); //erro de validação
        }
        return res.status(500).send(error.message);// outros erros
    }
});

app.patch('/users/:id', async (req, res) => { // Update de uma variavel do usuario
    try {
        const id = req.params.id;
        const user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json(user);
    } catch (error) {
        return res.status(500).send(error.message);
    }
})

app.delete('/users/:id', async (req, res) => { //delete do novo usuario
    try {
        const user = await UserModel.findByIdAndDelete(req.params.id);

        res.status(200).json(user);
    }
    catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message }); //erro de validação
        }
        return res.status(500).send(error.message);// outros erros
    }
});

app.listen(port, () => console.log(`Rodando express na porta ${port}!`));