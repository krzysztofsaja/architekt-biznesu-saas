import Dexie from 'dexie';
import { supabase } from './utils/supabase';

export const db = new Dexie('SmieciarkaDB');

db.version(1).stores({
  items: '++id, title, status, latitude, longitude, createdAt',
  messages: '++id, itemId, createdAt'
});

const useSupabase = true;

export const addItem = async (item) => {
  if (useSupabase) {
    console.log('Dodawanie do Supabase:', item);
    const { data, error } = await supabase.from('items').insert([{
      ...item,
      status: 'available',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }]).select();
    if (error) {
      console.error('Błąd Supabase:', error);
      throw error;
    }
    console.log('Dodano:', data);
    return data[0]?.id;
  }
  return await db.items.add({
    ...item,
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
};

export const getItems = async () => {
  if (useSupabase) {
    console.log('Pobieranie z Supabase...');
    const { data, error } = await supabase.from('items').select('*').order('created_at', { ascending: false });
    if (error) {
      console.error('Błąd pobierania:', error);
      throw error;
    }
    console.log('Pobrane:', data);
    return data;
  }
  return await db.items.toArray();
};

export const getItemById = async (id) => {
  if (useSupabase) {
    console.log('Pobieranie item id:', id);
    const { data, error } = await supabase.from('items').select('*').eq('id', id).single();
    if (error) {
      console.error('Błąd getItemById:', error);
      throw error;
    }
    return data;
  }
  return await db.items.get(id);
};

export const updateItem = async (id, data) => {
  if (useSupabase) {
    console.log('Aktualizacja item:', id, data);
    const { error } = await supabase.from('items').update({
      ...data,
      updated_at: new Date().toISOString()
    }).eq('id', id);
    if (error) {
      console.error('Błąd updateItem:', error);
      throw error;
    }
    return id;
  }
  return await db.items.update(id, {
    ...data,
    updatedAt: new Date().toISOString()
  });
};

export const deleteItem = async (id) => {
  if (useSupabase) {
    const { error } = await supabase.from('items').delete().eq('id', id);
    if (error) throw error;
    return id;
  }
  return await db.items.delete(id);
};

export const getItemsByStatus = async (status) => {
  if (useSupabase) {
    const { data, error } = await supabase.from('items').select('*').eq('status', status);
    if (error) throw error;
    return data;
  }
  return await db.items.where('status').equals(status).toArray();
};

export const addMessage = async (message) => {
  if (useSupabase) {
    const { data, error } = await supabase.from('messages').insert([{
      ...message,
      created_at: new Date().toISOString()
    }]).select();
    if (error) throw error;
    return data[0]?.id;
  }
  return await db.messages.add({
    ...message,
    createdAt: new Date().toISOString()
  });
};

export const getMessagesByItemId = async (itemId) => {
  if (useSupabase) {
    const { data, error } = await supabase.from('messages')
      .select('*')
      .eq('itemId', itemId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }
  return await db.messages
    .where('itemId')
    .equals(itemId)
    .reverse()
    .sortBy('createdAt');
};

export default db;