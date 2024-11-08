const knex = require('../dataBase/index');

module.exports ={

    async createComp(req, res){
        const {codcli}  = req.body;
        const { codpro }  = req.body;
        const { qtda }  = req.body;
        const { preco }  = req.body;

        if (codcli != '' && codpro !=''){
            repsclientes = await knex('clientes')
                            .where('codcli','=',codcli);
        }else{
            return res.status(400).send(
                {
                    msg:'Código do cliente ou do produto inexistente - antes da consulta  de produtos!!!!'
                }
            ); 
        }

        if (repsclientes != ''){
            const resProduto = await knex('produtos')
                    .where('codpro', '=', codpro);
            
            if (resProduto != ''){
                await knex('compras').insert({
                    codcli,
                    codpro,
                    qtda,
                    preco
                });
                return res.status(201).send(
                    {
                        msg:'Cadastro efetuado com sucesso !!!!'
                    }
                );
            }else{
                return res.status(400).send(
                    {
                        msg:'Código do produto inválido !!!!'
                    }
                );
            }
        }else{
            return res.status(400).send(
                {
                    msg:'Código do cliente inexistente - Após a consulta!!!!'
                }
            );
        }

      
    },
    async searchComp(req, res){
        const result = await knex('compras');
        return res.json(result);
    },
    async searchCompCod(req, res){
        const { codcomp } = req.params;
        const result = await knex('compras').where('codcomp','=',codcomp);

        return res.json(result);
    }
    

}