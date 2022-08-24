import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: any = req.headers.authorization;
    jwt.verify(token, secret);
    next();
  } catch (err) {
    if (err) res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default authenticationMiddleware;
