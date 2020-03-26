//Neste arquivo criamos a conexão com o bd, para não ter que ficá-la repetindo

const knex = require('knex');
const configuration = require('../../knexfile');

const connection = knex(configuration.development);

module.exports = connection;