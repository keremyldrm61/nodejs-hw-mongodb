import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
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

// Kullanıcı çıkış rotası
router.post('/logout', ctrlWrapper(logoutUserController));

// Oturum yenileme rotası (refresh token ile yeni access token al)
router.post('/refresh', ctrlWrapper(refreshUserSessionController));

export default router;
