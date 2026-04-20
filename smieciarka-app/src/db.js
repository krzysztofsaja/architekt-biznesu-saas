import Dexie from 'dexie';

export const db = new Dexie('SmieciarkaDB');

db.version(1).stores({
  items: '++id, title, status, latitude, longitude, createdAt',
  messages: '++id, itemId, createdAt'
});

export const addItem = async (item) => {
  return await db.items.add({
    ...item,
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
};

export const getItems = async () => {
  return await db.items.toArray();
};

export const getItemById = async (id) => {
  return await db.items.get(id);
};

export const updateItem = async (id, data) => {
  return await db.items.update(id, {
    ...data,
    updatedAt: new Date().toISOString()
  });
};

export const deleteItem = async (id) => {
  return await db.items.delete(id);
};

export const getItemsByStatus = async (status) => {
  return await db.items.where('status').equals(status).toArray();
};

export const addMessage = async (message) => {
  return await db.messages.add({
    ...message,
    createdAt: new Date().toISOString()
  });
};

export const getMessagesByItemId = async (itemId) => {
  return await db.messages
    .where('itemId')
    .equals(itemId)
    .reverse()
    .sortBy('createdAt');
};

export default db;