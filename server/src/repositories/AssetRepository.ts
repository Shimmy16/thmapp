// repository/AssetRepository.ts
import AssetModel from '../models/Asset';
// Hilfsfunktion: wandelt ein Mongo/Mongoose-Dokument in ein "DTO" (Plain Object mit id statt _id) um
function toDTO(doc: any) {
  // Prüfen, ob es ein echtes Mongoose-Dokument ist → dann toObject() aufrufen
  // Bei .lean() liefert Mongoose bereits ein Plain Object zurück, daher nur spreaden
 const obj =
   typeof doc?.toObject === 'function'
     ? doc.toObject({ versionKey: false }) // versionKey (_v) wird entfernt
     : { ...doc };
obj.id = obj._id; // neue Property id setzen (Frontend-freundlich)
 delete obj._id; // Original _id entfernen, damit nur id existiert
 return obj;
}
export default {
    // Alle Assets aus DB holen
 async findAll() {
   const docs = await AssetModel.find().lean();   // .lean() = bessere Performance, liefert Plain Objects
   return docs.map(toDTO); // alle Dokumente in DTOs umwandeln
 },
   // Einzelnes Asset anhand seiner ID suchen
 async findById(id: string) {
   const doc = await AssetModel.findById(id).lean(); // lean: vermeidet Overhead von Mongoose-Dokumenten
   return doc ? toDTO(doc) : null; // null zurückgeben, falls nichts gefunden
 },
   // Neues Asset in DB speichern
 async create(data: any) {
   const doc = await new AssetModel(data).save(); // .save() gibt ein Mongoose-Dokument zurück
   return toDTO(doc); // in DTO umwandeln, damit konsistent
 },
   // Asset aktualisieren
 async update(id: string, data: any) {
   await AssetModel.findByIdAndUpdate(id, data);
    // Hinweis: Rückgabewert wird nicht genutzt → ggf. updatedDoc zurückgeben, falls Frontend Feedback braucht
 },
   // Asset löschen
 async delete(id: string) {
   await AssetModel.findByIdAndDelete(id);
       // ebenfalls kein Rückgabewert → ggf. boolean oder gelöschtes Dokument zurückgeben
 },
};