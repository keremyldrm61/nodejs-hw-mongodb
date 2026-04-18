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
import { upload } from '../middlewares/multer.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const router = Router();

// Tüm contact rotaları için kimlik doğrulama gerekli
router.use(authenticate);

// Tüm contactları getir
router.get('/', ctrlWrapper(getContactsController));

// ID ile contact getir
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

// Yeni contact oluştur
router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

// Contact'ı tamamen güncelle
router.put(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(upsertContactController),
);

// Contact'ı kısmen güncelle
router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

// Contact'ı sil
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
