const clientRouter = require('express').Router();
const controller = require('../../controllers/v1/clients');

//clients CRUD
clientRouter.get('/', controller.getAll); //read all
clientRouter.get('/:id', controller.getById); //read one by his id (client id)
clientRouter.post('/create', controller.create); //create new client
clientRouter.put('/update', controller.update); //update client
clientRouter.delete('/delete/:id', controller.delete); //delete client

module.exports = clientRouter;
