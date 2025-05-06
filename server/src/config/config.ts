import dotenv from 'dotenv';

dotenv.config();

interface ConfigApp {
  port: number;
  URL_BD: string;
}

const config: ConfigApp = {
  port: Number(process.env.PORT) || 3000,
  URL_BD: String(process.env.URL_BD),
};

export default config;
