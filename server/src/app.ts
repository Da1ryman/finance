import express from 'express';
import config from './config/config';
import mongoose from 'mongoose';
import { routerFinance } from './routes/finance.routes';
import { routerUser } from './routes/user.routes';
import { routerAuth } from './routes/auth.routes';
import authMiddlewares from './middlewares/auth.middlewares';

const app = express();

app.use(express.json());

app.use('/api/finance/', authMiddlewares.checkingJWT, routerFinance);
app.use('/api/users/', authMiddlewares.checkingJWT, routerUser);
app.use('/api', routerAuth);

async function startApp() {
  try {
    await mongoose.connect(config.URL_BD);
    app.listen(config.port, () => {
      console.log('Сервер запущен на ' + String(config.port) + ' порту');
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();
