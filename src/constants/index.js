import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

// Token geçerlilik süreleri
export const FIFTEEN_MINUTES = 15 * 60 * 1000; // 15 dakika (milisaniye)
export const ONE_DAY = 24 * 60 * 60 * 1000; // 1 gün (milisaniye)
export const FIVE_MINUTES = 5 * 60 * 1000; // 5 dakika (milisaniye) - JWT token için

// SMTP e-posta yapılandırması için environment variable isimleri
export const SMTP = {
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASSWORD: 'SMTP_PASSWORD',
  SMTP_FROM: 'SMTP_FROM',
};

// E-posta şablonlarının bulunduğu dizin
export const TEMPLATES_DIR = path.join(process.cwd(), 'src', 'templates');

// Dosya yükleme dizinleri
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp'); // Geçici yükleme dizini
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads'); // Kalıcı dosya dizini

// Cloudinary yapılandırması için environment variable isimleri
export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};
