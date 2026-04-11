import { registerUser } from '../services/auth.js';

// Kullanıcı kontrolü için registerUserController oluşturacağız
export const registerUserController = async (req, res) => {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};
