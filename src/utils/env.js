import dotenv from 'dotenv';

dotenv.config();

export function env(name, defaultValue) {
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env[${name}].`);
}

// Onu şu şekilde kullanabiliriz: env('PORT', '3000');
// Eğer bu isimde bir ortam değişkeni belirtilmemişse ve varsayılan bir değer de verilmemişse,
// bu fonksiyonun çağrılması Missing: process.env['PORT'] mesajıyla bir hata fırlatır.
