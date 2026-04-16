import fs from 'node:fs/promises';
import cloudinary from 'cloudinary';

import { env } from './env.js';
import { CLOUDINARY } from '../constants/index.js';

// Cloudinary yapılandırması
// Environment variable'lardan alınan bilgilerle Cloudinary API'yi ayarlar

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

// Dosyayı Cloudinary'ye yükleyen ve geçici dosyaları silen fonksiyon
export const saveFileToCloudinary = async (file) => {
  // Dosyayı Cloudinary'ye yükle
  const response = await cloudinary.v2.uploader.upload(file.path);
  // Geçici dosyayı diskten sil (temp dizininden)
  await fs.unlink(file.path);
  // Cloudinary'deki dosyanın HTTPS URL'ini döndür
  return response.secure_url;
};
