import express, { Request, Response } from 'express'
import { User, UserModel } from '../models/users'
import jwt from "jsonwebtoken";
import verifyAuthToken from '../middlewares/validateJWT';

const store = new User()

const { TOKEN_SECRET } = process?.env;

const index = async (_req: Request, res: Response) => {
  const users = await store.index()
  res.json(users)
}

const show = async (req: Request, res: Response) => {
   const user = await store.show(req.params.id)
   res.json(user)
}

const create = async (req: Request, res: Response) => {
    try {
        const user: UserModel = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        };
        var token = jwt.sign({ user: user.firstName}, TOKEN_SECRET as string);
        res.json(token)

        const newUser = await store.create(user)
        // res.json(newUser)
    } catch(err) {
        res.status(400)
        res.json(err)
    }
}

const destroy = async (req: Request, res: Response) => {
    const deleted = await store.delete(req.body.id)
    res.json(deleted)
}

const usersRoutes = (app: express.Application) => {
  app.get('/users',verifyAuthToken, index)
  app.get('/users/:id',verifyAuthToken, show)
  app.post('/users', create)
  app.delete('/users/:id',verifyAuthToken, destroy)
}

export default usersRoutes