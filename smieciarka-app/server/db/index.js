import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://viqzsrmclimcnweioqym.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'sb_publishable_LtQCQ-a9r_8OqlcT6OI4Tw_BodMbBRZ';

let supabase = null;
let useSupabase = false;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

const inMemoryItems = [];
const inMemoryMessages = [];
let itemIdCounter = 1;
let messageIdCounter = 1;

export const useDb = () => useSupabase && supabase;

export const initDb = async () => {
  if (!supabase) {
    console.log('⚠️  Brak Supabase - tryb DEMO');
    useSupabase = false;
    return;
  }

  try {
    const { data, error } = await supabase.from('items').select('id').limit(1);
    if (error) throw error;
    useSupabase = true;
    console.log('✅ Połączono z Supabase!');
  } catch (err) {
    console.error('❌ Supabase error:', err.message);
    console.log('⚠️  Tryb DEMO aktywny');
    useSupabase = false;
  }
};

export const itemsDb = {
  getAll: async () => {
    if (useSupabase && supabase) {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }
    return [...inMemoryItems].reverse();
  },

  getById: async (id) => {
    if (useSupabase && supabase) {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', id)
        .single();
      return data;
    }
    return inMemoryItems.find(i => i.id == id);
  },

  create: async (item) => {
    if (useSupabase && supabase) {
      const { data, error } = await supabase
        .from('items')
        .insert(item)
        .select()
        .single();
      if (error) throw error;
      return data;
    }
    const newItem = { ...item, id: itemIdCounter++, created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
    inMemoryItems.push(newItem);
    return newItem;
  },

  update: async (id, data) => {
    if (useSupabase && supabase) {
      const { data: result, error } = await supabase
        .from('items')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return result;
    }
    const idx = inMemoryItems.findIndex(i => i.id == id);
    if (idx >= 0) {
      inMemoryItems[idx] = { ...inMemoryItems[idx], ...data, updated_at: new Date().toISOString() };
      return inMemoryItems[idx];
    }
    return null;
  },

  delete: async (id) => {
    if (useSupabase && supabase) {
      const { error } = await supabase
        .from('items')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return { id };
    }
    const idx = inMemoryItems.findIndex(i => i.id == id);
    if (idx >= 0) return inMemoryItems.splice(idx, 1)[0];
    return null;
  }
};

export const messagesDb = {
  getByItemId: async (itemId) => {
    if (useSupabase && supabase) {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('item_id', itemId)
        .order('created_at', { ascending: true });
      if (error) throw error;
      return data || [];
    }
    return inMemoryMessages.filter(m => m.item_id == itemId).sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
  },

  create: async (msg) => {
    if (useSupabase && supabase) {
      const { data, error } = await supabase
        .from('messages')
        .insert({ item_id: msg.itemId, sender: msg.sender, message: msg.message })
        .select()
        .single();
      if (error) throw error;
      return data;
    }
    const newMsg = { ...msg, id: messageIdCounter++, created_at: new Date().toISOString() };
    inMemoryMessages.push(newMsg);
    return newMsg;
  }
};

export default supabase;