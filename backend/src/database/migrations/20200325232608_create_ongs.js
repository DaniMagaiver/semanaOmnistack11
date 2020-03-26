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
