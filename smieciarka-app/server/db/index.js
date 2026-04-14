import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

let pool = null;
let useDatabase = false;

const inMemoryItems = [];
const inMemoryMessages = [];
let itemIdCounter = 1;
let messageIdCounter = 1;

if (process.env.DATABASE_URL) {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  pool.on('error', (err) => {
    console.error('Database error:', err.message);
  });
}

export const useDb = () => useDatabase && pool;

export const initDb = async () => {
  if (!pool) {
    console.log('⚠️  Brak bazy danych - tryb DEMO (pamięć)');
    useDatabase = false;
    return;
  }

  try {
    const client = await pool.connect({ timeout: 5000 });
    await client.query('SELECT 1');
    useDatabase = true;
    console.log('✅ Połączono z bazą danych!');

    await client.query(`
      CREATE TABLE IF NOT EXISTS items (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image TEXT,
        latitude DECIMAL(10, 8),
        longitude DECIMAL(11, 8),
        address VARCHAR(255),
        status VARCHAR(50) DEFAULT 'available',
        contact VARCHAR(50),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
        sender VARCHAR(100),
        message TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    console.log('✅ Tabele gotowe!');
    client.release();
  } catch (err) {
    console.error('❌ Baza niedostępna:', err.message);
    console.log('⚠️  Tryb DEMO aktywny');
    useDatabase = false;
  }
};

export const itemsDb = {
  getAll: async () => {
    if (useDatabase && pool) {
      const result = await pool.query('SELECT * FROM items ORDER BY created_at DESC');
      return result.rows;
    }
    return [...inMemoryItems].reverse();
  },

  getById: async (id) => {
    if (useDatabase && pool) {
      const result = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
      return result.rows[0];
    }
    return inMemoryItems.find(i => i.id == id);
  },

  create: async (item) => {
    if (useDatabase && pool) {
      const result = await pool.query(
        `INSERT INTO items (title, description, image, latitude, longitude, address, contact) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
        [item.title, item.description, item.image, item.latitude, item.longitude, item.address, item.contact]
      );
      return result.rows[0];
    }
    const newItem = { ...item, id: itemIdCounter++, created_at: new Date(), updated_at: new Date() };
    inMemoryItems.push(newItem);
    return newItem;
  },

  update: async (id, data) => {
    if (useDatabase && pool) {
      const fields = [];
      const values = [];
      let i = 1;
      for (const [k, v] of Object.entries(data)) {
        fields.push(`${k} = $${i++}`);
        values.push(v);
      }
      values.push(id);
      const result = await pool.query(`UPDATE items SET ${fields.join(',')}, updated_at = NOW() WHERE id = $${i} RETURNING *`, values);
      return result.rows[0];
    }
    const idx = inMemoryItems.findIndex(i => i.id == id);
    if (idx >= 0) {
      inMemoryItems[idx] = { ...inMemoryItems[idx], ...data, updated_at: new Date() };
      return inMemoryItems[idx];
    }
    return null;
  },

  delete: async (id) => {
    if (useDatabase && pool) {
      const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
      return result.rows[0];
    }
    const idx = inMemoryItems.findIndex(i => i.id == id);
    if (idx >= 0) return inMemoryItems.splice(idx, 1)[0];
    return null;
  }
};

export const messagesDb = {
  getByItemId: async (itemId) => {
    if (useDatabase && pool) {
      const result = await pool.query('SELECT * FROM messages WHERE item_id = $1 ORDER BY created_at ASC', [itemId]);
      return result.rows;
    }
    return inMemoryMessages.filter(m => m.item_id == itemId).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  },

  create: async (msg) => {
    if (useDatabase && pool) {
      const result = await pool.query(
        'INSERT INTO messages (item_id, sender, message) VALUES ($1,$2,$3) RETURNING *',
        [msg.itemId, msg.sender, msg.message]
      );
      return result.rows[0];
    }
    const newMsg = { ...msg, id: messageIdCounter++, created_at: new Date() };
    inMemoryMessages.push(newMsg);
    return newMsg;
  }
};

export default pool;