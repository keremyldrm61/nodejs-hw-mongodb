import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import {
  getContactsController,
  getContactByIdController,
  createContactController,
  deleteContactController,
  upsertContactController,
  patchContactController,
} from '../controllers/contacts.js';

import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { checkRoles } from '../middlewares/checkRoles.js';

import { ROLES } from '../constants/index.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const router = Router();

// Tüm contact rotaları için kimlik doğrulama gerekli
router.use(authenticate);

// Tüm contactları getir (sadece admin)
router.get(
  '/contacts',
  checkRoles(ROLES.ADMIN),
  ctrlWrapper(getContactsController),
);

// ID ile contact getir (admin veya contact sahibi)
router.get(
  '/contacts/:contactId',
  checkRoles(ROLES.ADMIN, ROLES.USER),
  isValidId,
  ctrlWrapper(getContactByIdController),
);

// Yeni contact oluştur (sadece admin)
router.post(
  '/register',
  checkRoles(ROLES.ADMIN),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

// Contact'ı tamamen güncelle (sadece admin)
router.put(
  '/contacts/:contactId',
  checkRoles(ROLES.ADMIN),
  isValidId,
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

// Contact'ı kısmen güncelle (admin veya contact sahibi)
router.patch(
  '/contacts/:contactId',
  checkRoles(ROLES.ADMIN, ROLES.USER),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

// Contact'ı sil (sadece admin)
router.delete(
  '/contacts/:contactId',
  checkRoles(ROLES.ADMIN),
  isValidId,
  ctrlWrapper(deleteContactController),
);

export default router;
