import bcrypt from 'bcrypt';

import { UsersCollection } from '../db/models/user.js';

// Kullanıcı kaydı için registerUser fonksiyonu
export const registerUser = async (payload) => {
  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword,
  });
};
