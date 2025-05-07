import Router from 'express';
import userController from '../controllers/user.controller';

export const routerUser = Router();

routerUser.get('/:id', userController.getUserById);
routerUser.get('/', userController.getAll);
routerUser.post('/', userController.postUser);
