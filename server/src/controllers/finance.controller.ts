import { Request, Response } from 'express';
import financeService from '../service/finance.service';
import { IFinance } from '../dto/finance.dto';

class FinanceController {
  async getAllByUserId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const finance = await financeService.historyUser(id);

      res.json(finance);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async postFinance(req: Request, res: Response) {
    try {
      const finance: IFinance = req.body;
      const newFinance = await financeService.create(finance);

      res.json(newFinance);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async putByPostId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const finance: IFinance = req.body;
      const updateFinance = await financeService.updateFinance(finance, id);

      res.json(updateFinance);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const deleteAll = await financeService.deleteAllById(id);

      res.json(deleteAll);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleteFinance = await financeService.deleteById(id);

      res.json(deleteFinance);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

export default new FinanceController();
