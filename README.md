<h1>11th Omnistack Week</h1>
<p>Repository created to follow the 11th week omnistack classes.</p>

<h2>Anotações</h2>

<h3>1ª e 2ª dia: Backend</h3>

<h4>Rotas e métodos http</h4>
<p>
//Converte as requisições para um JSON que pode ser compreendido pelo javascript. 
app.use(express.json());</p>

<p>
/**
 * Tipos de parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota após o simbolo de interrogação, geralmente utilizado para filtros, paginação. Posso enviar quantos Query Params quiser nomeando os com ?. Ex.: rota?nome=valor
 * 
 * Rote Params: Parâmetros utilizados para identificar recursos. Não são nomeados e devem ser enviados exatamente da forma e ordem como são esperados. 
 * Ex.: Na minha rota deverá estar rota/:id 
 * A requisição enviada pelo meu cliente deverá ser do tipo
 * rota/1 -> este 1 é o id que está sendo esperado na requisição.
 * 
 * Request Body: Corpo da requisição utilizado para criar ou alterar recursos.
 */</p>

<p>
//Rota raiz do node => /
//Uma vez que já importei o express utilizando o
const express = require('express'); posso acessar as rotas com:
app.get('/',(request, response) => {
    //Toda a manipulação de requisição e resposta fica aqui.
});
</p>

<p>Lembrando que é necessário ouvir a porta onde as informações irão entrar e sair</p>
<p>Para isso utilizamos o método listen do express
    app.listen(3333);
</p>

<p>
//A rota é o caminho para determinado recurso
/**
 * O método "GET" entrega uma informação.
 * O método "POST" cria uma informação.
 * O método "PUT" alterea uma informação.
 * O método "DELETE" deleta uma informação.
 * Sim, dá para fazer tudo por get, mas por questão de semântica é bom utilizar oso outros métodos.
 */</p>

 <p>
 //A requisição recebe os parâmetos do cliente
 </p>

 <p>
   //Posso obter os Query Params que o cliente envia na requisição desta maneira:
    // const params = request.query;
    // console.log(params);

    //Posso obter os Rote Params que o cliente envia na requisição desta maneira:
    // const params = request.params;
    // console.log(params);

    //Posso receber dados no corpo das requisições, ou seja não são passados pela URL.
    // const params = request.body;
    // console.log(params);

    //Os body params são recebido no formato JSON, portanto devemos com que o express converta os dados recebidos para este formato. Devemos adicionar no inicio da aplicação: app.use(express.json());

 </p>

 <p>
 A resposta pode ser dada no formato de um Json:
 app.post('/users',(request, response) => {

  
    return response.json({
        evento : "Semana Omnistack 11.0",
        aluno : "Danilo da Silva Fernandes"
    });
});
 </p>

 <p>//Para instalar uma dependendência durante o desenvolvimento da aplicação usamos a flag -D</p>

<p>
//npm install nodemon -D
//O nodemon atualiza a aplicação toda vez que o arquivo é alterado.
</p>

<p>
//Lembrando que podemos personalizar comandos através dos scripts do nosso packpage.json
//Assim posso personalizar o nodemon index.js, para escutar o arquivo como "start". Utilizando então apenas npm start.
</p>

<h4>Criação do banco de Dados</h4>
<p>
 /**
 * Temos dois tipos mais famosos de banco de dados SQL e NoSQL. O SQL é um tipo relacional, o que permite ter um controle melhor da estrutura dos dados da aplicação.
 * Os bancos NoSQL permitem uma flexibilidade melhor na estrutura dos dados.
 */
 </p>

<p>
/**
 * Existem duas abordagens para realizar as consultas aos bancos de dados.
 * Driver: Utiliza os comandos do SQL. SELECT * FROM
 * Query Builder: Utiliza comandos do javascript.
 * table('users').select('*').where(). Além de mais compreensivel para quem já utiliza javascript esta abordagem permite que não tenha que ficar trocando as queries caso troco o banco SQL.
 * KNEX.JS -> Querie Builder utilizado
 * SQLite -> Gerenciador de banco utilizado
 */
 </p>

 <p>
//Ao instalar o knex configuramos o knexfile.js
 </p>

 <p>
module.exports = {

  //Ambiente de desenvolvimento
  development: {
    client: 'sqlite3',
    connection: { //Realizamos a conexão com o banco de dados através do arquivo que definirmos
      filename: './src/database/db.sqlite'
    }, 
    migrations: {
      directory: './src/database/migrations'
    },
    //Esse comando serve para podermos utilizar valores nulos nas colunas do banco de dados. 
    useNullAsDefault: true,
  },


//Ambiente de testes para produção
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

//Ambiente de produção
  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};

 </p>

 
<p>
E criamos nossa migration que é como um histórico de alteração e criação das tabelas do nosso banco de dados. A migration contém os comandos que irão ser realizados ao criar uma tabela ou caso algo dê errado.
</p>

<p>
Para criar uma migrate rodamos o comando no prompt:
npx knex migrate:make nome_da_migrate
</p>

<p>Exemplo de migrate:</p>
<p>
//O que deve ser feito quando a tabela for criada
exports.up = function (knex) {
    //Comando para criar uma tabela utilizando o knex
    return knex.schema.createTable('ongs', function (table) {
        //Campo de chave primária
        table.string('id').primary();
        //Os campos são muito intuitivos de serem criados
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf').notNullable();
    });
};

//O que deve ser desfeito caso algo dê errado
exports.down = function (knex) {
    //comando para deletar a tabela
    return knex.schema.dropTable('ongs');
};
</p>

<p>
//Para executar uma migrate utilizamos o comando:
npx knex migrate: latest
</p>

<p>
//Para a conexão com o banco de dados podemos criar um arquivo separado na pasta de nosa 'database' chamado connection.
</p>

<p>
const knex = require('knex');

//Este é o arquivo de onde tiramos as configurações que fizemos e que contem o caminho do banco
const configuration = require('../../knexfile');

//Estamos mandando o banco se conectar utilizando as configurações de desenvolvimento
const connection = knex(configuration.development);

module.exports = connection;
</p>

<h4>Criação das rotas</h4>

<h5>POST</h5>
<p>
//Uma dica é desestruturar a requisição em variáveis separadas assim sabemos exatamente o que está sendo enviado. Lembrando que como estamos lidando com JSON utilizamos o object desestruturing {}.

const {name, email, whatsapp, city, uf} = request.body;
</p>

<p>
//Para gerar uma id aleatória podemos usar o randomBytes do módulo crypto do node
const crypto = require('crypto');
const id = crypto.randomBytes(4).toString('HEX');
</p>

<p>
//Como a inserção de dados demora um certo tempo utilizamos uma função assíncrona para isto na requisição para que a resposta seja dada apenas quando os dados terminarem de serem inseridos na tabela.

routes.post('/ongs', async (request, response) => {

     await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
    });

    return response.json({ id });
});


</p>