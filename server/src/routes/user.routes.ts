import Router from 'express';
import userController from '../controllers/user.controller';

export const routerUser = Router();

routerUser.get('/users/:id', userController.getUserById);
routerUser.post('/users/', userController.postUser);
