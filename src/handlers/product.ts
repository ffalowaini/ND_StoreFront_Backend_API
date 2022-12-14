import express, { Request, Response } from 'express'
import verifyAuthToken from '../middlewares/validateJWT'
import { Product, ProductModel } from '../models/product'

const store = new Product()

const index = async (_req: Request, res: Response) => {
  const products = await store.index()
  res.json(products)
}

const show = async (req: Request, res: Response) => {
   const product = await store.show(req.params.id)
   res.json(product)
}

const create = async (req: Request, res: Response) => {
    try {
        const product: ProductModel = {
            name: req.body.name,
            price: req.body.price
        };

        const newProduct = await store.create(product)
        res.json(newProduct)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const productRoutes = (app: express.Application) => {
  app.get('/products', index)
  app.get('/products/:id', show)
  app.post('/products',verifyAuthToken, create)
  app.delete('/products/:id', destroy)
}

export default productRoutes