import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tspqgwrxxxlqoeeyyphb.supabase.co";
const supabaseKey = import.meta.env.VITE_APP_SUPBASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
