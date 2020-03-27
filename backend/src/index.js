//jshint esversion:6

const express = require('express');

//importanto as nossas rotas que definimos no arquivo routes
const routes = require('./routes');

//determina quem pode acessar a aplicação, no caso de estar em produção o servidor.
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

//indicamos que usaremos as rotas dentro do express.
app.use(routes);

app.listen(3333);



