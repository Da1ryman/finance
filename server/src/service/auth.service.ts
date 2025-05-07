import config from '../config/config';
import { IUser } from '../dto/user.dto';
import userService from './user.service';
import jwt from 'jsonwebtoken';

class AuthService {
  async signup(user: IUser) {
    try {
      const userExist = await userService.userByEmail(user.email);

      if (userExist) {
        return new Error('The user exist');
      } else {
        const newUser = await userService.create(user);

        return newUser;
      }
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await userService.userByEmail(email);

      if (user) {
        if (user.password === password) {
          const token = jwt.sign({ email, password }, config.secret, {
            expiresIn: '7d',
          });

          return { id: user._id, name: user.name, token };
        } else {
          return new Error('invalid password');
        }
      } else {
        return new Error('invalid email');
      }
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  async verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, config.secret);

      return decoded;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
}

export default new AuthService();
