import { Router } from 'express';
import financeController from '../controllers/finance.controller';

export const routerFinance = Router();

routerFinance.get('/:userId', financeController.getAllByUserId);
routerFinance.post('/', financeController.postFinance);
routerFinance.put('/:financeId', financeController.putByPostId);
routerFinance.delete('/', financeController.deleteAll);
routerFinance.delete('/:financeId', financeController.delete);
