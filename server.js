import jsonServer from 'json-server';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = express();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

const PORT = process.env.PORT || 3001;

// Middlewares
server.use(middlewares);

// Static frontend build göstərmək üçün
server.use(express.static(path.join(__dirname, 'dist')));

// API endpoint
server.use(router);

// Frontend router dəstəyi üçün (SPA)
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Serveri başladırıq
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


