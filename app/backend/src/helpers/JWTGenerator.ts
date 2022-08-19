import { sign, SignOptions } from 'jsonwebtoken';
import IEmail from '../interfaces/email.interface';

const SECRET = 'batatatatata';
const jwtDefaultConfig: SignOptions = {
//   expiresIn: '30d',
  algorithm: 'HS256',
};

const generateJWTToken = (payload: IEmail) => sign(payload, SECRET, jwtDefaultConfig);

export default generateJWTToken;
