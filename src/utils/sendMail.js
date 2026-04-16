import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';
import { env } from '../utils/env.js';

// Nodemailer SMTP transporter yapılandırması
const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST), // SMTP sunucu adresi
  port: Number(env(SMTP.SMTP_PORT)), // SMTP port numarası
  auth: {
    user: env(SMTP.SMTP_USER), // SMTP kullanıcı adı
    pass: env(SMTP.SMTP_PASSWORD), // SMTP şifresi
  },
});

// E-posta gönderme fonksiyonu
export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
