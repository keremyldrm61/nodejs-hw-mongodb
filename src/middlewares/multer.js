import multer from 'multer';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

// Multer için disk üzerinde saklama stratejisi tanımla
const storage = multer.diskStorage({
  // Dosyanın geçici olarak kaydedileceği klasör
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  // Dosya adı oluştur (çakışmayı önlemek için unique suffix eklenir)
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, `${uniqueSuffix}_${file.originalname}`);
  },
});

// Multer instance'ı oluştur
export const upload = multer({ storage });
