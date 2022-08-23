import { Router, Request, Response, NextFunction } from 'express';
import Matches from '../controllers/match.Control';

const matchesRouter = Router();

const matches = new Matches();

matchesRouter.get(
  '/',
  (req: Request, res: Response, next: NextFunction) => matches
    .getAllMatches(req, res, next),
);

export default matchesRouter;
