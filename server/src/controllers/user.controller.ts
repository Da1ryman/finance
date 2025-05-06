import { Request, Response } from 'express';
import userService from '../service/user.service';

class UserController {
  async postUser(req: Request, res: Response) {
    try {
      const user = req.body;
      const newUser = await userService.create(user);

      res.json(newUser);
    } catch (error) {
      console.error(error);
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await userService.userById(id);

      res.json(user);
    } catch (error) {
      console.error(error);
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const users = await userService.allUsers();

      res.json(users);
    } catch (error) {
      console.error(error);
    }
  }
}

export default new UserController();
