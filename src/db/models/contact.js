import { model, Schema } from 'mongoose';

// Contact modeli - kullanıcı ile ilişkilendirilmiş kişiler
const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      required: true,
      default: 'personal',
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'users', // Kullanıcı ile ilişki
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const ContactsCollection = model('contacts', contactsSchema);
