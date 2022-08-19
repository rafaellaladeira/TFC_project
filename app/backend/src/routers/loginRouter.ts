import { NextFunction, Request, Response, Router } from 'express';
import LoginControl from '../controllers/login.Control';

const router = Router();

const loginControl = new LoginControl();
router.post('/', (req: Request, res: Response, next: NextFunction) => loginControl
  .login(req, res, next));

export default router;
