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
        return res.status(200).json({ token });
      }
      return res.status(402).json({ message: 'Something is wrong' });
    } catch (err) {
      next(err);
    }
  }
}
