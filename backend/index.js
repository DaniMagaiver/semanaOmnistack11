//jshint esversion:6

const express = require('express');

const app = express();

//Rota raiz do node
app.get('/',(request, response) => {
    //A resposta é um JSON
    return response.json({
        evento : "Semana Omnistack 11.0",
        aluno : "Danilo da Silva Fernandes"
    });
});

//Estamos ouvindo a porta 3333, mas ainda não possuimos rota
app.listen(3333);


