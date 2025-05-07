import { Router } from 'express';
import authController from '../controllers/auth.controller';

export const routerAuth = Router();

routerAuth.post('/login/', authController.loginUser);
routerAuth.post('/signup/', authController.signupUser);
