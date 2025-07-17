import express, { Request, Response } from 'express';
import cors                          from 'cors';
import bodyParser                    from 'body-parser';
import swaggerUi                     from 'swagger-ui-express';
import YAML                          from 'yamljs';
import path                          from 'path'; // ← hinzugefügt
import os                            from 'os';

import assetRouter      from './routes/AssetRouter';
import userRouter       from './routes/UserRouter';
import authMiddleware   from './middleware/auth';
import './config/database';

// ─────────────────────────────────────────
// Grund­konstanten
// ─────────────────────────────────────────
const HOST = '0.0.0.0';
const PORT = 5000;

const ip =
 (Object.values(os.networkInterfaces())
   .flat()
   .find(
     (i): i is os.NetworkInterfaceInfo =>
       i?.family === 'IPv4' && !i.internal
   )?.address) ?? HOST;

// ─────────────────────────────────────────
// Express-App & Middleware
// ─────────────────────────────────────────
const app = express();

app.use(
 cors({
   origin: [`http://localhost:5173`, `http://${ip}:5173`],
   credentials: true,
 })
);
app.use(bodyParser.json());

// ─────────────────────────────────────────
// Swagger-UI
// ─────────────────────────────────────────
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ─────────────────────────────────────────
// API-Routen
// ─────────────────────────────────────────
app.use('/api/assets', /* authMiddleware, */ assetRouter);
app.use('/api', userRouter);

// Health-Check
app.get('/', (_req: Request, res: Response) => {
 res.send('Server läuft!');
});

// ─────────────────────────────────────────
// Server-Start
// ─────────────────────────────────────────
app.listen(PORT, HOST, () => {
 console.log('──────────────────────────────────────────────');
 console.log(`Backend    → http://${ip}:${PORT}`);
 console.log(`Swagger UI → http://${ip}:${PORT}/api-docs`);
 console.log('──────────────────────────────────────────────');
});
