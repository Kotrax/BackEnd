const knex = require('../dataBase/index');

module.exports ={

    async clisGeral(req,res){
        try{
        const result = await knex('clientes');
        return res.json(result);

        }catch (error) {
            return res.status(400).json({'error': error});
        } 
        },

    async clisNome(req,res){
        try{
        const { nome } = req.params;
        const result = await knex('clientes').where('nome','like','%'+ nome +'%');
        return res.json(result);

        }catch (error) {
            return res.status(400).json({'error': error});
        } 
    },


    async createCli(req,res){
        try{
        const {nome} = req.body;
        const {email} = req.body;
        const {uf} = req.body;
        const {password} = req.body;
        const {level} = req.body;
        await knex('clientes').insert({
            nome,
            email,
            uf,
            password,
            level,
        });

        return res.status(201).send(
            {
                msg:'cadastro do cliente realizado com sucesso!!!'
            }
        );

    }catch (error) {
        return res.status(400).json({'error': error});
    }
    },

    async updateCli(req,res){
        const {codcli} =req.params;
        const {nome} = req.body;
        const {email} = req.body;
        const {uf} = req.body;
        const {password} = req.body;
        const {level} = req.body;

        await knex('clientes').update({
            nome,
            email,
            uf,
            password,
            level,
        }).where({codcli});
        return res.status(201).send(
            {
                msg:'atualizaçao do cliente efetuada com sucesso'
            }
        );
},
        async deleteCli(req,res){
          const {codcli} =req.params;
          
          console.log(codcli);
          await knex ('clientes')
          .where ({codcli})
          .del();

           return res.status(201).send(
           {
                msg:'registro do cliente deletado com sucesso'
            }
        );
        },
}; 