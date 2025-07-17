import User from '../models/User';

const UserRepository = {
  async findByEmailAndPassword(email: string, password: string) {
    return await User.findOne({ email, password });
  },
  async create(user: any) {
    return await new User(user).save();
  }
};


export default UserRepository;