import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Key:', supabaseKey ? '****' + supabaseKey.slice(-10) : 'missing');

if (!supabaseUrl || !supabaseKey) {
  console.error('Brak zmiennych środowiskowych!');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export const initSupabase = async () => {
  const { data, error } = await supabase.from('items').select('count');
  if (error) {
    console.error('Błąd połączenia z Supabase:', error.message);
    return false;
  }
  console.log('Połączono z Supabase!');
  return true;
};

export const syncItemsToSupabase = async () => {
  const { data: localItems } = await supabase.from('items').select('*');
  return localItems || [];
};

export default supabase;
