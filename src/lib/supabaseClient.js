import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or anon key is missing. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

let supabaseClient;
if (supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} else {
  const emptyResult = { data: [], error: null };
  const makeQuery = () => {
    const q = {
      order: () => Promise.resolve(emptyResult),
      then: (resolve) => resolve(emptyResult),
      catch: () => Promise.resolve(emptyResult),
    };
    return q;
  };

  supabaseClient = {
    from: () => ({
      select: () => makeQuery(),
    }),
    auth: {
      getUser: async () => ({ data: null, error: null }),
      user: () => null,
      signIn: async () => ({ data: null, error: new Error('Supabase not configured') }),
    },
  };
}

export const supabase = supabaseClient;
