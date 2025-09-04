import { Request, Response } from 'express';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

const AuthService = {
    // Login-Flow
  async login(req: Request, res: Response): Promise<void> {
    const user = await UserRepository.findByEmailAndPassword(req.body.email, req.body.password);
    if (!user) {
      res.status(401).json({ message: 'Login fehlgeschlagen' });
      return;
    }
    // DTO bauen
    const userObj = {
      ...user.toObject(),
      id: user._id.toString(),
    };
    delete (userObj as any)._id;

    res.json({ token: 'dummy-token', user: userObj });
  },
  // Registrierung
  async register(req: Request, res: Response) {
    await UserRepository.create(req.body);
    res.status(201).json({ message: 'Benutzer erfolgreich registriert' });
  },
  // Aktuellen User lesen
  async getCurrentUser(req: Request, res: Response): Promise<any> {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
      return res.status(401).json({ message: 'Nicht eingeloggt' });
    }
    // Nur notwendige Felder selektieren
    const user = await User.findById(userId).select('email');
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    const userObj = {
      ...user.toObject(),
      id: user._id.toString(),
    };
    delete (userObj as any)._id;

    res.json(userObj);
  },
  // Aktuellen User updaten
  updateCurrentUser: async (req: Request, res: Response): Promise<any> => {
    const userId = req.headers['x-user-id'] as string;
    if (!userId) {
      return res.status(401).json({ message: 'Nicht eingeloggt' });
    }

    const { email, password, currentPassword } = req.body;

    // Benutzer holen
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Benutzer nicht gefunden' });
    }

    // Wenn Passwort geändert werden soll → aktuelles Passwort prüfen
    if (password) {
      if (!currentPassword) {
        return res.status(400).json({ message: 'Aktuelles Passwort erforderlich' });
      }

      if (user.password !== currentPassword) {
        return res.status(401).json({ message: 'Aktuelles Passwort ist falsch' });
      }

      user.password = password;
    }
    // Email-Update
    if (email) {
      user.email = email;
    }

    await user.save();

    const userObj = {
      ...user.toObject(),
      id: user._id.toString(),
    };
    delete (userObj as any)._id;

    res.json(userObj);
  },
};

export default AuthService;
