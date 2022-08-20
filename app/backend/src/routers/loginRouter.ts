import { NextFunction, Request, Response, Router } from 'express';
// import IAuthorization from '../interfaces/authorization.interface';
import LoginControl from '../controllers/login.Control';

const router = Router();

const loginControl = new LoginControl();

router.post('/', (req: Request, res: Response, next: NextFunction) => loginControl
  .login(req, res, next));

router.get('/validate', (
  req: Request,
  res: Response,
  next: NextFunction,
) => loginControl
  .validate(req, res, next));

export default router;
