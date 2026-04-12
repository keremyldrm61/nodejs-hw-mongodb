import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { UsersCollection } from '../db/models/user.js';

// Kullanıcı kaydı için registerUser fonksiyonu
export const registerUser = async (payload) => {
  // E-posta adresinin daha önce kullanılıp kullanılmadığını kontrol et
  const user = await UsersCollection.findOne({ email: payload.email });
  // E-posta zaten kayıtlıysa 409 Conflict hatası fırlat
  if (user) throw createHttpError(409, 'Email in use');

  // Şifreyi bcrypt ile hashle
  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  // Yeni kullanıcıyı hashlenmiş şifre ile oluştur ve döndür
  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};
