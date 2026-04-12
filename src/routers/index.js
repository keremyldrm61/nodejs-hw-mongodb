import { Router } from 'express';
import contactsRouter from './contacts.js';
import authRouter from './auth.js';

// İletişim bilgileri ve kullanıcı koleksiyonu ile etkileşim için 2 ayrı yönlendiricimiz olduğuna göre,
// bunların bağlantılarını ayrı bir dosyaya taşımak daha iyi olacaktır
const router = Router();

router.use('/contacts', contactsRouter);
router.use('/auth', authRouter);

export default router;
