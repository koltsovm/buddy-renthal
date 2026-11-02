// TODO: Create supabase client setup
import { createClient } from '@supabase/supabase-js';

// TODO: Add environment variables
const supabaseUrl = process.env.SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function withSupabase<T>(callback: (supabase: any) => Promise<T>): Promise<T> {
  return callback(supabase);
}