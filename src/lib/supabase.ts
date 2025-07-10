import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

interface Summary {
  id?: string;
  url: string;
  summary: string;
  language: 'en' | 'ur';
  user_id: string;
  created_at: string;
}

export const saveSummary = async (summaryData: Omit<Summary, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('summaries')
    .insert([summaryData])
    .select();
    
  return { data, error };
};
