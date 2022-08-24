import { Request, Response, NextFunction } from 'express';
import match from '../database/models/match';
import MatchesService from '../services/matchService';

export default class Matches {
  private _matchesService: MatchesService;

  constructor() {
    this._matchesService = new MatchesService();
  }

  public async getAllMatches(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const state = req.query.inProgress;
      if (!state) {
        const result: match[] = await this._matchesService.getAllMatches();
        return res.status(200).json(result);
      }
      let value = 0;
      if (state === 'true') value = 1;
      const result: match[] = await this._matchesService.getBySearch(value);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  public async createNewMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this._matchesService.createNewMatch(req.body);
      return res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }
}
