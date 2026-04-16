import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import pino from 'pino-http';

import router from './routers/index.js';

import { env } from './utils/env.js';

// Middlewares
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import { UPLOAD_DIR } from './constants/index.js';

const PORT = Number(env('PORT', '3000'));

export const startServer = () => {
  const app = express();

  // Middleware'leri yapılandır
  app.use(express.json()); // JSON body parser
  app.use(cors()); // Cross-Origin Resource Sharing
  app.use(cookieParser()); // Cookie yönetimi için

  // HTTP isteklerini logla
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  // Upload edilen dosyaları statik olarak kullan
  app.use('/uploads', express.static(UPLOAD_DIR));

  // Rotaları bağla
  app.use(router);

  // 404 hata yönetimi
  app.use('*all', notFoundHandler);

  // Genel hata yönetimi
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
