import { Router } from 'express';
import financeController from '../controllers/finance.controller';

export const routerFinance = Router();

routerFinance.get('/finance/:userId', financeController.getAllByUserId);
routerFinance.post('/finance/', financeController.postFinance);
routerFinance.put('/finance/:financeId', financeController.putByPostId);
routerFinance.delete('/finance/', financeController.deleteAll);
routerFinance.delete('/finance/:financeId', financeController.delete);
