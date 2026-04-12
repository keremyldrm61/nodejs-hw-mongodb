import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';

import { randomBytes } from 'crypto';
import { FIFTEEN_MINUTES, ONE_DAY } from '../constants/index.js';
import { UsersCollection } from '../db/models/user.js';
import { SessionsCollection } from '../db/models/session.js';

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

// Kullanıcı girişi ve oturum oluşturmak için loginUser fonksiyonu
export const loginUser = async (payload) => {
  // E-posta ile kullanıcıyı veritabanında ara
  const user = await UsersCollection.findOne({ email: payload.email });
  // Kullanıcı bulunamazsa 404 hatası fırlat
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  // Girilen şifre ile veritabanındaki hashlenmiş şifreyi karşılaştır
  const isEqual = await bcrypt.compare(payload.password, user.password);

  // Şifreler eşleşmiyorsa 401 Unauthorized hatası fırlat
  if (!isEqual) {
    throw createHttpError(401, 'Unauthorized');
  }

  // Kullanıcının eski oturumunu sil (varsa)
  await SessionsCollection.deleteOne({ userId: user._id });

  // Rastgele access ve refresh token oluştur
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  // Yeni oturum oluştur ve döndür
  return await SessionsCollection.create({
    userId: user._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

// Kullanıcı çıkışı için oturumu sil
export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({ _id: sessionId });
};
