import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import router from './routers/index.js';

import { env } from './utils/env.js';

// Middlewares
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Yönlendiricilerin sunucumuza bağlanmasını güncellemek için
  // import ve bağlantı güncellendi
  app.use(router);

  app.use('*all', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
