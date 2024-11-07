const express = require('express');
const controllerProd = require('./controllers/controlllerProd');
const controllerCli = require('./controllers/controllerCli');
const controllerCom= require('./controllers/controllerComp');

const routes = express.Router();

routes.get('/',controllerProd.raiz);

//Produtos

routes.get('/produtos',controllerProd.prodsGeral);
routes.get('/produtosnome/:nome', controllerProd.prodsNome);
routes.post('/produtos',controllerProd.createProd);
routes.put('/produtos/:codpro',controllerProd.updateProd);
routes.delete('/produtos/:codpro',controllerProd.deleteProd);

//Cliente

routes.get('/clientes',controllerCli.clisGeral);
routes.get('/produtosnome/:nome', controllerCli.clisNome);
routes.post('/clientes',controllerCli.createCli);
routes.put('/clientes/:codcli',controllerCli.updateCli);
routes.delete('/clientes/:codcli',controllerCli.deleteCli);

//Compra

routes.post('/compra',controllerCom.createComp);
routes.get('/compras', controllerCom.searchComp);
routes.get('/comprascod/:codcomp', controllerCom.searchCompCod);


module.exports = routes;