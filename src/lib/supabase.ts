import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getAIRankings() {
  const { data, error } = await supabase
    .from('ai_rankings')
    .select('*')
    .order('rank', { ascending: true });
  
  if (error) {
    console.error('Error fetching rankings:', error);
    return [];
  }
  return data;
}
