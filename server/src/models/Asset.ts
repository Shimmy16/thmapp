// models/Asset.ts
import mongoose from 'mongoose';

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


export default mongoose.model('Asset', assetSchema);
