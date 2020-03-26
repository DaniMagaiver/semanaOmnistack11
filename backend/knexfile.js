// Update with your config settings.

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
