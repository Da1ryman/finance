import { NextFunction, Request, Response } from 'express';
import authService from '../service/auth.service';

class AuthMiddleware {
  checkingJWT(req: Request, res: Response, next: NextFunction) {
    try {
      const auth = req.headers.authorization;

      if (auth && auth.startsWith('Bearer')) {
        const token = auth.slice(7);
        authService.verifyToken(token);

        next();
      } else {
        res.status(403).json('No auth');
      }
    } catch (error) {
      res.status(403).json(error);
    }
  }
}

export default new AuthMiddleware();
