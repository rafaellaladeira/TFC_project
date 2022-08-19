import { NextFunction, Request, Response } from 'express';
import generateJWTToken from '../helpers/JWTGenerator';
import LoginService from '../services/loginService';

export default class LoginControl {
  private _loginService: LoginService;

  constructor() {
    this._loginService = new LoginService();
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const check = await this._loginService.login(req.body);
      if (check) {
        const token = generateJWTToken(req.body.email);
        res.status(200).json({ token });
      }
    } catch (err) {
      next(err);
    }
  }
}
