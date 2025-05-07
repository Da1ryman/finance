import { IUser } from '../dto/user.dto';
import { User } from '../models/user.modal';

class UserService {
  async create(user: IUser) {
    try {
      const newUser = await User.create(user);

      return newUser;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  async allUsers() {
    try {
      const allUsers = await User.find();

      return allUsers;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  async userById(id: string) {
    try {
      const user = await User.findById(id);

      return user;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  async userByEmail(email: string) {
    try {
      const user = await User.findOne({ email });

      return user;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
}

export default new UserService();
