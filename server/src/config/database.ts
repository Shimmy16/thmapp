import mongoose from 'mongoose'; // Importiert das Mongoose-Modul zur Kommunikation mit MongoDB
import dotenv from 'dotenv';  // Importiert dotenv zum Laden von Umgebungsvariablen aus .env-Dateien

dotenv.config(); // Lädt .env-Datei (nur nötig bei lokaler Entwicklung)

const mongoUrl = process.env.MONGO_URL; // Holt die MongoDB-URL aus der Umgebungsvariable

// Prüft, ob die MONGO_URL vorhanden ist – wenn nicht, beendet das Skript mit einem Fehler
if (!mongoUrl) {
  console.error('❌ MONGO_URL is not defined in environment variables.');
  process.exit(1); // Beendet den Node.js-Prozess mit Fehlercode 1
}

// Stellt eine Verbindung zur MongoDB her
mongoose.connect(mongoUrl)
  .then(() => console.log('✅ MongoDB connected')) // Bei erfolgreicher Verbindung: Ausgabe im Terminal
  .catch(err => {
    console.error('❌ MongoDB connection error:', err); // Bei Fehler: Fehlermeldung ausgeben
    process.exit(1);  // Beendet den Prozess, um auf Verbindungsprobleme zu reagieren
  });
