import * as Bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import ILogin from '../interfaces/login.interface';
import User from '../database/models/user';
import Error from '../helpers/httpError';

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class LoginService {
  public login = async (body: ILogin) => {
    const { email, password } = body;
    if (!email || !password) throw new Error(400, 'All fields must be filled');
    const result = await User.findOne({ where: { email } });
    if (result === null) throw new Error(401, 'Incorrect email or password');
    if (!Bcrypt.compareSync(password, result.password as string)) {
      throw new Error(401, 'Incorrect email or password');
    }
    return true;
  };

  public getByEmail = async (token: string) => {
    const email = jwt.verify(token, secret);
    const data = await User.findOne({
      attributes: ['role'],
      where: { email } });
    return data;
  };
}
