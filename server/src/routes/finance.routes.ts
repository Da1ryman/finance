import { Router } from 'express';
import financeController from '../controllers/finance.controller';

export const routerFinance = Router();

routerFinance.get('/', financeController.getAllByUserId);
routerFinance.post('/', financeController.postFinance);
routerFinance.put('/:financeId', financeController.putByPostId);
routerFinance.delete('/all', financeController.deleteAll);
routerFinance.delete('/:financeId', financeController.delete);
