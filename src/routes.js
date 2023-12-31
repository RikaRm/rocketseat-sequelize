const express = require('express')
const routes = express.Router()

const UserController = require('./controllers/UserController')
const AddressController = require('./controllers/AddressController')
const TechController = require('./controllers/TechController')

routes.get('/', (request, response)=>{
    response.json({hello:'hello world'})
})

routes.post('/users', UserController.store)
routes.get('/users', UserController.index)

routes.post('/users/:user_id/address', AddressController.store)
routes.get('/users/:user_id/address', AddressController.index)

routes.get('/users/:user_id/techs', TechController.index)
routes.post('/users/:user_id/techs', TechController.store)
routes.delete('/users/:user_id/techs', TechController.delete)

module.exports = routes;