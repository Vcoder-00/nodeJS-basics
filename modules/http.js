const http = require("http");
const { stringify } = require("querystring");

const port = 8080;

const server = http.createServer((req, res) => {
    if (req.url === '/home') {
        res.writeHead(200, { "content-type": "text/html" });
        res.end("<h1>Home Page</h1>");
    }
    if (req.url === '/users') {
        const users = [
            {
                name: "Vitor Lopes",
                email: "lopesvitor@gmail.com"
            },
            {
                name: "Julio César",
                email: "jc@gmail.com"
            }
        ]
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify(users));
    }
}   
);

server.listen(port, () => console.log(`Rodando/Escutando na porta ${port}!`));