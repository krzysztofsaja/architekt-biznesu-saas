import { itemsDb } from '../db/index.js';
import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const items = await itemsDb.getAll();
    res.json(items);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Failed' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await itemsDb.getById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, image, latitude, longitude, address, contact } = req.body;
    if (!title) return res.status(400).json({ error: 'Title required' });
    const item = await itemsDb.create({ title, description, image, latitude, longitude, address, contact });
    res.status(201).json(item);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: 'Failed' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const item = await itemsDb.update(req.params.id, req.body);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const item = await itemsDb.delete(req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed' });
  }
});

export default router;