import User from '../models/User';

const UserRepository = {
    // Sucht einen User anhand von Email und Passwort
  async findByEmailAndPassword(email: string, password: string) {
    return await User.findOne({ email, password });
  },
    // Erstellt einen neuen User in der Datenbank
  async create(user: any) {
    return await new User(user).save(); // .save() gibt das gespeicherte Mongoose-Dokument zurück
  }
};


export default UserRepository;