import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './db/index.js';
import itemsRouter from './routes/items.js';
import messagesRouter from './routes/messages.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));

app.use('/api/items', itemsRouter);
app.use('/api/messages', messagesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Smieciarka API', version: '1.0.0' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

const start = async () => {
  await initDb();
  app.listen(PORT, () => {
    console.log(`🚀 Server: http://localhost:${PORT}`);
  });
};

start();

export default app;