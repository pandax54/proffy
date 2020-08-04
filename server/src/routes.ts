import express from 'express';
import db from './database/connection';
import convertHourToMinute from './utils/convertHourToMinute';


// controllers
import ClassesController from './controllers/ClassesController';
const classesController = new ClassesController()
import ConnectionsController from './controllers/ConnectionsController'
const connectionsController = new ConnectionsController();

const routes = express.Router();


// routes.get('/', (request, response) => {
//     return response.json({ message: "Hello World" })
// });

// routes.post('/users', (request, response) => {
// });

routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);


routes.post('/connections', connectionsController.create)
routes.get('/connections', connectionsController.index)

export default routes;