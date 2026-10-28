import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qddlhpsxvjrlvlsundcr.supabase.co';
const supabaseKey = 'sb_publishable_kIjqrj2u7jn5cl37y6eOxw_gSzy20H3';

export const supabase = createClient(supabaseUrl, supabaseKey);
