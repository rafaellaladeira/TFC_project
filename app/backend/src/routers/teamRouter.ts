import { NextFunction, Request, Response, Router } from 'express';
import TeamControl from '../controllers/team.Control';

const teamRouter = Router();

const teamControl = new TeamControl();
teamRouter.get('/', (req: Request, res: Response, next: NextFunction) => teamControl
  .getAll(req, res, next));

export default teamRouter;
