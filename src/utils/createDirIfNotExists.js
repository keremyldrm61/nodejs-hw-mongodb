import fs from 'node:fs/promises';

// Verilen dizin yoksa oluştur
export const createDirIfNotExists = async (url) => {
  try {
    // Dizin var mı kontrol et
    await fs.access(url);
  } catch (err) {
    // Dizin yoksa oluştur
    if (err.code === 'ENOENT') {
      await fs.mkdir(url);
    }
  }
};
