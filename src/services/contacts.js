import { ContactsCollection } from '../db/models/contact.js';

// Tüm iletişim bilgilerini almak için
export const getAllContacts = async () => {
  const contacts = await ContactsCollection.find();
  return contacts;
};

// Id'ye göre iletişim bilgilerini almak için
export const getContactById = async (contactId) => {
  const contact = await ContactsCollection.findById(contactId);
  return contact;
};

// Create
export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

// Update (Patch)
export const updateContact = async (contactId, payload, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    {
      _id: contactId,
    },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!rawResult || !rawResult.value) return null;

  return {
    contact: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

// Delete
export const deleteContact = async (contactId) => {
  const contact = await ContactsCollection.findOneAndDelete({
    _id: contactId,
  });

  return contact;
};
