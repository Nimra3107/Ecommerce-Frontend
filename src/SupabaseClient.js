import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || "https://vtsfbqwtqdqemkjbcmfz.supabase.co";
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY || "sb_publishable_6yS5tE2xLz4NQotUAVI5Zg_nlfyv37_"; 

export const supabase = createClient(supabaseUrl, supabaseKey);