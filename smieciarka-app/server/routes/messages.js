import express from 'express';
import { messagesDb } from '../db/index.js';

const router = express.Router();

router.get('/:itemId', async (req, res) => {
  try {
    const messages = await messagesDb.getByItemId(req.params.itemId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { itemId, sender, message } = req.body;
    if (!itemId || !sender || !message) {
      return res.status(400).json({ error: 'itemId, sender, message required' });
    }
    const msg = await messagesDb.create({ itemId, sender, message });
    res.status(201).json(msg);
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

export default router;