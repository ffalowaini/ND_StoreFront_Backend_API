import express, { Request, Response } from 'express'
import verifyAuthToken from '../middlewares/validateJWT'
import { Order, OrderModel } from '../models/order'
import { Product, ProductModel } from '../models/product'
import { User, UserModel } from '../models/users'

const store = new Order()

const index = async (_req: Request, res: Response) => {
  const orders = await store.index()
  res.json(orders)
}

const show = async (req: Request, res: Response) => {
   const order = await store.show(req.params.id)
   res.json(order)
}

const create = async (req: Request, res: Response) => {
    try {
        const order: OrderModel = {
            quantity: req.body.quantity,
            productId: req.body.productId,
            userId: req.body.userId,
            statusId: req.body.statusId
        };

        const newOrder = await store.create(order)
        res.json(newOrder)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const orderRoutes = (app: express.Application) => {
  app.get('/orders',verifyAuthToken, index)
  app.get('/orders/:id', verifyAuthToken,show)
  app.post('/orders',verifyAuthToken, create)
  app.delete('/orders/:id', verifyAuthToken,destroy)
}

export default orderRoutes