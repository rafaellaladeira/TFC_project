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
      return res.status(404).json({ message: 'Something is wrong' });
    } catch (err) {
      next(err);
    }
  }

  public async validate(req: Request<any>, res: Response, next: NextFunction) {
    try {
      const { authorization }: any = req.headers;
      const data = await this._loginService.getByEmail(authorization);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
}

// timeout na questão 5, não entendi o pq
