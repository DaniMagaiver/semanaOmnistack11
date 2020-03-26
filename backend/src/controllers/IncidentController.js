//jshint esversion:8
const connection = require('../database/connection');

module.exports = {
    async index(request,response){
        const { page = 1 } = request.query;

        //Total de items
        const [count] = await connection('incidents').count();

        //Sistema de paginação de incidents
        const incidents = await connection('incidents')
        //Além dos dados do incident retorno os dados da ong
        .join('ongs','ongs.id','=','incidents.ong_id')
        //Limitando a paginação a 5 resultados
        .limit(5)
        //Serve para definir o intervalo das páginas através do valor que é passado pelo nosso query param.
        .offset((page - 1) * 5)
        .select(['incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf']);
        
        response.header('X-Total-Count',count['count(*)']);

        return response.json(incidents);
    },

    async create(request,response){
        const { title, description, value} = request.body;

        //Assim podemos acessar parâmetros passados pelo cabeçalho da requisição, é utilizado geralmente para autenticações de login, lingua, etc;
        const ong_id = request.headers.authorization;

        //A conexão com chave estrangeira me retorna uma id
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({id});
    },

    async delete(request,response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        //Estou buscando na tabela Incident se o id daquele incident pertence a ong que está querendo deletá-lo
        .where('id', id)
        .select('ong_id')
        .first();

        if (incident.ong_id != ong_id){
            //Caso o não seja retorno como resposta um erro de não autorizado, isto é o erro 401
            return response.status(401).json({error:'Operation not permitted.'});
        }
        
        await connection('incidents').where('id',id).delete();

        //retorno uma resposta que não possui conteúdo apenas para dizer que deu sucesso na requisição
        return response.status(204).send();
    }
}