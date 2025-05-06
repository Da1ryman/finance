import { Router } from 'express';
import financeController from '../controllers/finance.controller';

export const routerFinance = Router();

routerFinance.get('/finance/:id', financeController.getAllByUserId);
routerFinance.post('/finance/', financeController.postFinance);
routerFinance.put('/finance/:id', financeController.putByPostId);
routerFinance.delete('/finance/', financeController.deleteAll);
routerFinance.delete('/finance/:id', financeController.delete);
