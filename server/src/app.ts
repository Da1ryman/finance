import express from 'express';
import config from './config/config';
import mongoose from 'mongoose';

const app = express();

app.use(express.json());

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
