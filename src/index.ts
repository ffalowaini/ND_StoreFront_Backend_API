import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import usersRoutes from './handlers/users';
import productRoutes from './handlers/product';
import orderRoutes from './handlers/order';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json());

usersRoutes(app);
productRoutes(app);
orderRoutes(app);

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.get('/info', (req: Request, res: Response): void => {
    res.status(200).send('The server works proparly');
  });

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
