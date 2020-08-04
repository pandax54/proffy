import express from 'express';
import routes from './routes'
import cors from 'cors'

const app = express();

app.use(cors())
//reconhecer json do request.body
app.use(express.json());

app.use(routes);


// ouvir requisições http
app.listen(3333);