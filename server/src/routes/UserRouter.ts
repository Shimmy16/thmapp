import express from 'express';
import AuthService from '../services/AuthService';

const router = express.Router();

router.post('/login', AuthService.login); // Login-Route
router.post('/register', AuthService.register); // Registrierung eines neuen Users


router.get('/me', AuthService.getCurrentUser); // Gibt den eingeloggten User zurück
router.put('/me', AuthService.updateCurrentUser); // Aktualisiert das Profil des eingeloggten Users


export default router;

