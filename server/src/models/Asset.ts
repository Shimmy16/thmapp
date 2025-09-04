// models/Asset.ts
import mongoose from 'mongoose';

// Definiert das Schema für ein Asset-Dokument in MongoDB
const assetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  status: { type: String },
  historie: [{
    datum: { type: String },
    event: { type: String }
  }]
});

// Exportiert das definierte Mongoose-Modell „Asset“, damit es in anderen Dateien verwendet werden kann
export default mongoose.model('Asset', assetSchema);
