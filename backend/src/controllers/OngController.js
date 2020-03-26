//jshint esversion:8
const connection = require('../database/connection');

//Este módulo do express serve para criptografia, mas podemos usar para gerar um id com caracteres aleatórios
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        //Conectando-se ao banco e selecionando todos os campos
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },
    
    async create(request, response) {
        //Desestruturando a requisição para ter os campos em variáveis separadas
        const { name, email, whatsapp, city, uf } = request.body;

        //Gerando 4 números e os convertendo para hexadecimal
        const id = crypto.randomBytes(4).toString('HEX');

        //Passando os dados de nossa requisição para o banco
        //Como a inserção dos dados demora alguns instantes precisamos tornar nossa função post assincrona para aguardar essa inserção e só então devolver uma resposta
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.json({ id });
    }
};