import { IFinance } from '../dto/finance.dto';
import { Finance } from '../models/finance.model';

class FinanceService {
  async create(finance: Omit<IFinance, 'userId'>, userId: string) {
    try {
      const newFinance = await Finance.create({
        userId,
        type: finance.type,
        description: finance.description,
        category: finance.category,
        amount: finance.amount,
      });

      return newFinance;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  async historyUser(userId: string) {
    try {
      const history = await Finance.find({ userId });

      return history;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  async updateFinance(finance: IFinance, financeId: string) {
    try {
      await Finance.findByIdAndUpdate({ _id: financeId }, finance);

      return finance;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  async deleteAllById(userId: string) {
    try {
      const deleteAllFinance = await Finance.deleteMany({ userId });

      return deleteAllFinance;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }

  async deleteById(financeId: string) {
    try {
      const deleteFinance = await Finance.deleteOne({ _id: financeId });

      return deleteFinance;
    } catch (error) {
      console.error(error);

      throw error;
    }
  }
}

export default new FinanceService();
