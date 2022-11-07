import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader: String | undefined = req.headers.authorization
        const token = authorizationHeader?.split(' ')[1]
        const decoded = jwt.verify(token as string, process.env.TOKEN_SECRET as string)

        next()
    } catch (error) {
        res.send("Unauthrized").status(401)
    }
}

export default verifyAuthToken;
