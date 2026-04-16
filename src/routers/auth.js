import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  requestResetEmailController,
  resetPasswordController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

// Kimlik doğrulama rotalarını yönet (register, login, logout, refresh)
const router = Router();

// Kullanıcı kayıt rotası
router.post(
  '/register',
  validateBody(registerUserSchema), // istek gövdesini doğrula
  ctrlWrapper(registerUserController), // controller'ı çalıştır
);

// Kullanıcı giriş rotası
router.post(
  '/login',
  validateBody(loginUserSchema), // istek gövdesini doğrula
  ctrlWrapper(loginUserController), // controller'ı çalıştır
);

// Şifre sıfırlama e-postası gönderme rotası
router.post(
  '/request-reset-email',
  validateBody(requestResetEmailSchema), // E-posta adresini doğrula
  ctrlWrapper(requestResetEmailController), // controller'ı çalıştır
);

// Şifre sıfırlama rotası (token ile)
router.post(
  '/reset-password',
  validateBody(resetPasswordSchema), // Token ve şifreyi doğrula
  ctrlWrapper(resetPasswordController), // controller'ı çalıştır
);

// Oturum yenileme rotası (refresh token ile yeni access token al)
router.post('/refresh', ctrlWrapper(refreshUserSessionController));

// Kullanıcı çıkış rotası
router.post('/logout', ctrlWrapper(logoutUserController));

export default router;
