// const { Person } = require("./person");

const dotenv = require('dotenv');
dotenv.config();
const connectToDB = require("./src/database/connect"); //'import do node.js'

connectToDB();

// require("./modules/path");
// require("./modules/fs");
// require("./modules/http"); 
// require('./modules/express');


// const person = new Person("Hello World");

