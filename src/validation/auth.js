import Joi from 'joi';

// Doğrulama için Register User Schema
export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(36).required(),
});
