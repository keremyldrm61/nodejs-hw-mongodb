import path from 'node:path';
import fs from 'node:fs/promises';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';
import { env } from './env.js';

// Geçici klasöre yüklenen dosyayı kalıcı klasöre taşır
export const saveFileToUploadDir = async (file) => {
  // Dosya temp klasöründen uploads klasörüne taşınır
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  // Dosyanın erişilebilir URL'İ döndürülür
  return `${env('APP_DOMAIN')}/uploads/${file.filename}`;
};
