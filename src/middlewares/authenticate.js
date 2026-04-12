import createHttpError from 'http-errors';

import { SessionsCollection } from '../db/models/session.js';
import { UsersCollection } from '../db/models/user.js';

// Kullanıcı kimlik doğrulama middleware'i (Bearer token kontrolü)
export const authenticate = async (req, res, next) => {
  // Authorization header'ını al
  const authHeader = req.get('Authorization');

  // Header yoksa hata döndür
  if (!authHeader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  // Bearer token'ı ayır
  const bearer = authHeader.split(' ')[0];
  const token = authHeader.split(' ')[1];

  // Bearer formatı kontrolü
  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  // Access token ile oturumu bul
  const session = await SessionsCollection.findOne({ accessToken: token });

  // Oturum bulunamazsa hata döndür
  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  // Access token'ın süresinin dolup dolmadığını kontrol et
  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);

  // Token süresi dolmuşsa hata döndür
  if (isAccessTokenExpired) {
    next(createHttpError(401, 'Access token expired'));
  }

  // Kullanıcıyı bul
  const user = await UsersCollection.findById(session.userId);

  // Kullanıcı bulunamazsa hata döndür
  if (!user) {
    next(createHttpError(401));
    return;
  }

  // Kullanıcıyı request'e ekle
  req.user = user;

  next();
};
