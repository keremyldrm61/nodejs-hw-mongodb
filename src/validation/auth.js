import Joi from 'joi';

// Kullanıcı kaydı için doğrulama şeması
export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(36).required(),
});

// Kullanıcı girişi için doğrulama şeması
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(36).required(),
});

// Şifre sıfırlama e-postası isteği için doğrulama şeması
export const requestResetEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Şifre sıfırlama için doğrulama şeması (token ve yeni şifre)
export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  password: Joi.string().min(6).max(36).required(),
});
