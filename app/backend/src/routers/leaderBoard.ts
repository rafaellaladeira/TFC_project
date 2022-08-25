import { NextFunction, Request, Response, Router } from 'express';
import Leader from '../controllers/leader.Control';

const leaderBoardRouter = Router();
const leader = new Leader();

leaderBoardRouter.get(
  '/home',
  (req: Request, res: Response, next: NextFunction) => leader.filterHome(req, res, next),
);

leaderBoardRouter.get(
  '/away',
  (req: Request, res: Response, next: NextFunction) => leader.filterAway(req, res, next),
);

export default leaderBoardRouter;
