import express from 'express';
import AuthService from '../services/AuthService';

const router = express.Router();

router.post('/login', AuthService.login);
router.post('/register', AuthService.register);

// Neu hinzugefügt:
router.get('/me', AuthService.getCurrentUser);
router.put('/me', AuthService.updateCurrentUser);


export default router;

