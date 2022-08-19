import { sign } from 'jsonwebtoken';
import IEmail from '../interfaces/email.interface';
import 'dotenv/config';

type Secret = string;

const secret: Secret = process.env.JWT_SECRET || 'jwt_secret';

const generateJWTToken = (payload: IEmail) => sign(payload, secret);

export default generateJWTToken;
