import { model, Schema } from 'mongoose';

import { ROLES } from '../../constants/index.js';

// User modeli - rol tabanlı yetkilendirme ile

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.USER], // Admin veya User
      default: ROLES.USER, // Varsayılan rol: user
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

// Kullanıcı verisi JSON'a dönüştürüldüğünde şifreyi otomatik olarak kaldırır
usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const UsersCollection = model('users', usersSchema);
