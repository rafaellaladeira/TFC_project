import { Request, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';
import IId from '../interfaces/teamId.interface';
import TeamService from '../services/teamService';

export default class Team {
  private _teamService: TeamService;

  constructor() {
    this._teamService = new TeamService();
  }

  public async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._teamService.getAll();
      if (result) return res.status(200).json(result);
      return res.status(402).json({ message: 'Something is wrong' });
    } catch (err) {
      next(err);
    }
  }

  public async getById(req: Request<IId>, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await this._teamService.getById(id);
      if (result !== null) return res.status(200).json(result);
      return res.status(402).json({ message: 'Invalid id' });
    } catch (err) {
      next(err);
    }
  }
}
