import config from '../config/config';
import { IUser } from '../dto/user.dto';
import userService from './user.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

interface DecodedJWT {
  id: string;
  name: string;
  iat?: number;
  exp?: number;
}

class AuthService {
  async signup(user: IUser) {
    try {
      const userExist = await userService.userByEmail(user.email);

      if (userExist) {
        return new Error('The user exist');
      } else {
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(user.password, salt);
        user.password = hashPassword;
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
        const checkPassword = await bcrypt.compare(password, user.password);

        if (checkPassword) {
          const token = jwt.sign(
            { id: user._id, name: user.name },
            config.secret,
            {
              expiresIn: '7d',
            },
          );

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

  verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, config.secret);

      return decoded;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  getUserIdByToken(token: string) {
    try {
      const { id } = jwt.verify(token, config.secret) as DecodedJWT;

      return id;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
}

export default new AuthService();
