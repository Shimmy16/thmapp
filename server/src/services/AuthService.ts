import { Request, Response } from 'express';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';


const AuthService = {
  async login(req: Request, res: Response): Promise<void> {
    const user = await UserRepository.findByEmailAndPassword(req.body.email, req.body.password);
    if (!user) {
      res.status(401).json({ message: 'Login fehlgeschlagen' });
      return;
    }

    const userObj = {
      ...user.toObject(),
      id: user._id.toString()
    };
    delete (userObj as any)._id;

    res.json({ token: 'dummy-token', user: userObj });
  },

  async register(req: Request, res: Response) {
    await UserRepository.create(req.body);
    res.status(201).json({ message: 'Benutzer erfolgreich registriert' });
  },

  async getCurrentUser(req: Request, res: Response): Promise<any> {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
      return res.status(401).json({ message: 'Nicht eingeloggt' });
    }

    const user = await User.findById(userId).select('email');
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    const userObj = {
      ...user.toObject(),
      id: user._id.toString()
    };
    delete (userObj as any)._id;

    res.json(userObj);
  },

  updateCurrentUser: async (req: Request, res: Response): Promise<any> => {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
      res.status(401).json({ message: 'Nicht eingeloggt' });
      return;
    }

    const { email, password } = req.body;
    const update: any = {};
    if (email) update.email = email;
    if (password) update.password = password;

    const user = await User.findByIdAndUpdate(userId, update, { new: true }).select('email');
    if (!user) {
      res.status(404).json({ message: 'Benutzer nicht gefunden' });
      return;
    }

    const userObj = {
      ...user.toObject(),
      id: user._id.toString()
    };
    delete (userObj as any)._id;
    res.json(userObj);
  }
};

export default AuthService;
