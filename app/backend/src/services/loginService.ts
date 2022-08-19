import * as Bcrypt from 'bcryptjs';
import ILogin from '../interfaces/login.interface';
import User from '../database/models/user';
import Error from '../helpers/httpError';

export default class LoginService {
  public login = async (body: ILogin) => {
    const { email, password } = body;
    if (!email || !password) throw new Error(400, 'All fields must be filled');
    const result = await User.findOne({ where: { email } });
    console.log(result);
    if (result === null) throw new Error(401, 'Incorrect email or password');
    if (!Bcrypt.compareSync(password, result.password as string)) {
      throw new Error(401, 'Incorrect email or password');
    }
    return true;
  };
}
