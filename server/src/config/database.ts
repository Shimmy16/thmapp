import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Lädt .env-Datei (nur nötig bei lokaler Entwicklung)

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error('❌ MONGO_URL is not defined in environment variables.');
  process.exit(1);
}

mongoose.connect(mongoUrl)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });
