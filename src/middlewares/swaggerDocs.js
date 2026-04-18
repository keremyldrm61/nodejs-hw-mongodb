import createHttpError from 'http-errors';
import swaggerUI from 'swagger-ui-express';
import fs from 'node:fs';

import { SWAGGER_PATH } from '../constants/index.js';

// Swagger UI arayüzünü sunan middleware fonksiyonu
export const swaggerDocs = () => {
  try {
    // JSON formatındaki swagger dosyasını senkron olarak oku ve parse et
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());

    // swaggerUI.serve -> Gerekli statik dosyaları (CSS, JS) sunar
    // swaggerUI.setup -> Doküman içeriğini arayüze yükler
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch {
    // Eğer dosya bulunamazsa (npm run build-docs çalıştırılmamışsa) hata fırlat
    return (req, res, next) =>
      next(createHttpError(500, "Can't load swagger docs"));
  }
};
