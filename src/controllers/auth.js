import { loginUser, registerUser } from '../services/auth.js';

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
  // Kullanıcı doğrulamasını yap
  await loginUser(req.body);
};
