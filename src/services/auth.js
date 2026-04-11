import { UsersCollection } from '../db/models/user.js';

// Kullanıcı kaydı için registerUser fonksiyonu
export const registerUser = async (payload) => {
  return await UsersCollection.create(payload);
};
