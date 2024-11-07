const knex = require('../dataBase/index');

module.exports ={

    async raiz(req,res){
        try{
       
        return res.json({
            msg:'Raiz do servidor',
            msg:'Porta de uso 2020'
        });
        
    }   catch (error) {
        return res.status(400).json({'error': error});
    } 
    },

    async prodsGeral(req,res){
        try{
        const result = await knex('produtos').orderBy('codpro');
        return res.json(result);
        
    }   catch (error) {
        return res.status(400).json({'error': error});
    } 
    },
    
    async prodsNome(req,res){
        try{
        const { nome } = req.params;
        const result = await knex('produtos').where('nome','like','%'+ nome +'%');
        return res.json(result);

    }   catch (error) {
        return res.status(400).json({'error': error});
    }
    },


    async createProd(req,res){
        try{
        const {nome} = req.body;
        const {descri} = req.body;
        const {fabricante} = req.body;
        const {qtda} = req.body;
        const {preco} = req.body;
        const {custo} = req.body;

        console.log( nome + descri + fabricante + qtda +  preco + custo);
        

        await knex('produtos').insert({
            nome,
            descri,
            fabricante,
            qtda,
            preco,
            custo
        });
        return res.status(201).send(
            {
                msg:'cadastro efetuado com sucesso!!!'
            }
        );
    }catch (error) {
            return res.status(400).json({'error': error});
        }
       
    },

    async updateProd(req,res){
        const {codpro} =req.params;
        const {nome} = req.body;
        const {descri} = req.body;
        const {fabricante} = req.body;
        const {qtda} = req.body;
        const {preco} = req.body;
        const {custo} = req.body;
        await knex('produtos').update({
            nome,
            descri,
            fabricante,
            qtda,
            preco,
            custo 
        }).where({codpro});
        return res.status(201).send(
            {
                msg:'atualizaçao efetuada com sucesso'
            }
        );
},
        async deleteProd(req,res){
          const {codpro} =req.params;
          try {
            const response = await knex('compras').where({codpro});
            if (response.length!=0){
                return res.status(409).send({msg:'Registro não pode ser deletado, consta venda na tabela compras'});
                
            }else{
          await knex ('produtos')
          .where ({codpro})
          .del();
          return res.status(200).send({ msg:'Registro deletado com sucesso !!!!'});
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ msg: error });
    }
 }
}
