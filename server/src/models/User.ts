import mongoose from 'mongoose';

// Definiere das Schema für Benutzer-Daten in der MongoDB
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

export default mongoose.model('User', userSchema);