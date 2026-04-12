import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  loginUserController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

// Kimlik doğrulama rotalarını yönet (register, login)
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

export default router;
