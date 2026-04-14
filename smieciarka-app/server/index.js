import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { pool, initDb } from './db/index.js';
import itemsRouter from './routes/items.js';
import messagesRouter from './routes/messages.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
}));

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
  try {
    if (process.env.DATABASE_URL) {
      await initDb();
    } else {
      console.log('⚠️  DATABASE_URL not set - running without database');
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err.message);
    process.exit(1);
  }
};

start();

export default app;