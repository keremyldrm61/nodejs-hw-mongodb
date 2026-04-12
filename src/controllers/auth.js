import { loginUser, logoutUser, registerUser } from '../services/auth.js';

import { ONE_DAY } from '../constants/index.js';

// Kullanıcı kaydı için controller
export const registerUserController = async (req, res) => {
  // Yeni kullanıcıyı oluştur
  const user = await registerUser(req.body);

  // Başarılı kayıt yanıtı döndür
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

// Kullanıcı girişi için controller
export const loginUserController = async (req, res) => {
  // Kullanıcı doğrulaması yap ve oturum oluştur
  const session = await loginUser(req.body);

  // Refresh token'ı httpOnly cookie olarak sakla
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  // Session ID'yi httpOnly cookie olarak sakla
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY),
  });

  // Access token'ı response body'de döndür
  res.json({
    status: 200,
    message: 'Successfully logged in a user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

// Kullanıcı çıkışı için controller
export const logoutUserController = async (req, res) => {
  // Session ID varsa oturumu veritabanından sil
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  // Cookie'leri temizle
  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  // 204 No Content yanıtı döndür
  res.status(204).send();
};
