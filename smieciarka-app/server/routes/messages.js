import express from 'express';
import { pool } from '../db/index.js';

const router = express.Router();

router.get('/:itemId', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM messages WHERE item_id = $1 ORDER BY created_at ASC',
      [req.params.itemId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching messages:', err.message);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { itemId, sender, message } = req.body;

    if (!itemId || !sender || !message) {
      return res.status(400).json({ error: 'itemId, sender and message are required' });
    }

    const itemCheck = await pool.query(
      'SELECT id FROM items WHERE id = $1',
      [itemId]
    );

    if (itemCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Item not found' });
    }

    const result = await pool.query(
      `INSERT INTO messages (item_id, sender, message) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [itemId, sender, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating message:', err.message);
    res.status(500).json({ error: 'Failed to create message' });
  }
});

export default router;