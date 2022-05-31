import express from 'express'
import { routes } from './routes';

const app = express();

app.use(express.json()); //plugin do express para poder utilizar requisições em JSON

app.use(routes);

app.listen(3000, () => {
   console.log("The Server is Running!")
})
