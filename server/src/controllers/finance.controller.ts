import { Request, Response } from 'express';
import financeService from '../service/finance.service';
import { IFinance } from '../dto/finance.dto';
import authService from '../service/auth.service';

class FinanceController {
  async getAllByUserId(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.slice(7);

      if (token) {
        const userId = authService.getUserIdByToken(token);
        const finance = await financeService.historyUser(userId);

        res.json(finance);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async postFinance(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.slice(7);
      if (token) {
        const userId = authService.getUserIdByToken(token);
        const finance: Omit<IFinance, 'userId'> = req.body;

        const newFinance = await financeService.create(finance, userId);

        res.json(newFinance);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async putByPostId(req: Request, res: Response) {
    try {
      const { financeId } = req.params;
      const finance: IFinance = req.body;
      const updateFinance = await financeService.updateFinance(
        finance,
        financeId,
      );

      res.json(updateFinance);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.slice(7);

      if (token) {
        const userId = authService.getUserIdByToken(token);
        const deleteAll = await financeService.deleteAllById(userId);

        res.json(deleteAll);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { financeId } = req.params;
      const deleteFinance = await financeService.deleteById(financeId);

      res.json(deleteFinance);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new FinanceController();
