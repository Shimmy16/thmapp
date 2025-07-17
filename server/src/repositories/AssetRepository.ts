// repository/AssetRepository.ts
import AssetModel from '../models/Asset';
/* Hilfs-Funktion: Mongo-_id ⇒ id  */
function toDTO(doc: any) {
 // Wenn es ein echtes Mongoose-Dokument ist, toObject() verwenden.
 // Bei .lean() kommt bereits ein Plain Object zurück.
 const obj =
   typeof doc?.toObject === 'function'
     ? doc.toObject({ versionKey: false })
     : { ...doc };
obj.id = obj._id;
 delete obj._id;
 return obj;
}
export default {
 async findAll() {
   const docs = await AssetModel.find().lean();   // lean = Plain JS Objects
   return docs.map(toDTO);
 },
 async findById(id: string) {
   const doc = await AssetModel.findById(id).lean();
   return doc ? toDTO(doc) : null;
 },
 async create(data: any) {
   const doc = await new AssetModel(data).save(); // hier Dokument
   return toDTO(doc);
 },
 async update(id: string, data: any) {
   await AssetModel.findByIdAndUpdate(id, data);
 },
 async delete(id: string) {
   await AssetModel.findByIdAndDelete(id);
 },
};