import { Request, Response } from 'express';
import { ILoginUser, IUser } from '../dto/user.dto';
import authService from '../service/auth.service';

class AuthController {
  async signupUser(req: Request, res: Response) {
    try {
      const registrationData: IUser = req.body;
      const registration = await authService.signup(registrationData);

      if (registration instanceof Error) {
        res.status(409).json(registration.message);
      }

      res.status(201).json(registration);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password }: ILoginUser = req.body;
      const token = await authService.login(email, password);

      if (token instanceof Error) {
        res.status(401).json(token.message);
      }

      res.json(token);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new AuthController();
