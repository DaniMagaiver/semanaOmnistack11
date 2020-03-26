
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table){
      //Cria um id com auto incremento
     table.increments();

     table.string('title').notNullable();
     table.string('description').notNullable();
     table.decimal('value').notNullable();

     //Campo relacional com qual ong criou este incident
     table.string('ong_id').notNullable();

     //Estou definindo que o campo 'ong_id' é uma chave estrangeira isto quer dizer que precisa existir dentro da tabela 'ongs' e que faz referência ao mesmo campo que existe nela.
     table.foreign('ong_id').references('id').inTable('ongs');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
