import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

dns.setServers(['8.8.8.8', '8.8.4.4']);

const { MONGO_URL } = process.env;

console.log('🔍 Verificando MONGO_URL:', MONGO_URL ? '✅ Encontrada' : '❌ Não encontrada');

export const connectDb = async () => {
  if (!MONGO_URL) {
    console.error('❌ MONGO_URL não definida no arquivo .env');
    process.exit(1);
  }

  try {
    await mongoose.connect(MONGO_URL, {
      family: 4,
      serverSelectionTimeoutMS: 10000 
    });
    console.log('✅ Conectado ao MongoDB - Barbearia');
  } catch (error) {
    console.error('❌ Erro ao conectar:', error.message);
    console.log('\n💡 DICA: Verifique se seu IP está liberado no MongoDB Atlas');
    console.log('   1. Acesse https://cloud.mongodb.com');
    console.log('   2. Vá em Network Access');
    console.log('   3. Adicione 0.0.0.0/0 para teste');
    process.exit(1);
  }
};