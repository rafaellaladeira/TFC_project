import { NextFunction, Request, Response } from 'express';
import error from '../helpers/httpError';

const httpErrorMiddleware = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.log('httpErrorMiddleware');
  const { status, message } = err as error;
  res.status(status || 500).json({ message });
};

export default httpErrorMiddleware;
