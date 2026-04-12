import createHttpError from 'http-errors';

import { ContactsCollection } from '../db/models/contact.js';
import { ROLES } from '../constants/index.js';

// Rol tabanlı yetkilendirme middleware'i
export const checkRoles =
  (...roles) =>
  async (req, res, next) => {
    // Kullanıcı bilgisini al
    const { user } = req;
    if (!user) {
      next(createHttpError(401));
      return;
    }

    const { role } = user;

    // Admin rolü kontrolü - admin her şeye erişebilir
    if (roles.includes(ROLES.ADMIN) && role === ROLES.ADMIN) {
      next();
      return;
    }

    // User rolü kontrolü - sadece kendi verilerine erişebilir
    if (roles.includes(ROLES.USER) && role === ROLES.USER) {
      const { contactId } = req.params;

      // ContactId yoksa erişim yasak
      if (!contactId) {
        next(createHttpError(403));
        return;
      }

      // Contact'ın kullanıcıya ait olup olmadığını kontrol et
      const contact = await ContactsCollection.findOne({
        _id: contactId,
        userId: user._id,
      });

      // Contact kullanıcıya aitse izin ver
      if (contact) {
        next();
        return;
      }
    }

    // Yetkisiz erişim
    next(createHttpError(403));
  };
