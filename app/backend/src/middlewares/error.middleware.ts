import { NextFunction, Request, Response } from 'express';
import error from '../helpers/httpError';

const httpErrorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log('httpErrorMiddleware');
  const { status, message } = err as error;
  if (message === 'invalid token') res.status(401).json({ message: 'Token must be a valid token' });
  res.status(status || 500).json({ message });
};

export default httpErrorMiddleware;
