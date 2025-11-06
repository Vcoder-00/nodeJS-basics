const express = require('express');

const app = express();

const port = 8080;

app.get('/home', (req, res) => {
    res.contentType("text/html");
    res.status(200).send("<h1>Hello World</h1>");       
});

app.get("/users", (req, res) => {
    const users = [{
        name: "John Doe",
        email: "john@doe.com",
    },
    {
        name: "Anne Doe",
        email: "anne@doe.com",
    }
    ];
    res.status(200).json(users);
})

app.listen(port, () => console.log(`Rodando express na porta ${port}!`));