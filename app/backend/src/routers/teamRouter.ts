import { NextFunction, Request, Response, Router } from 'express';
import IId from '../interfaces/teamId.interface';
import TeamControl from '../controllers/team.Control';

const teamRouter = Router();

const teamControl = new TeamControl();

teamRouter.get('/', (req: Request, res: Response, next: NextFunction) => teamControl
  .getAll(req, res, next));

teamRouter.get('/:id', (req: Request<IId>, res: Response, next: NextFunction) => teamControl
  .getById(req, res, next));

export default teamRouter;
