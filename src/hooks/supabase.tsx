import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hseaihljqoilgnsuanse.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzZWFpaGxqcW9pbGduc3VhbnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUwOTc5MzcsImV4cCI6MjA0MDY3MzkzN30.yBz9_o35KNbm0xblNeFI_q_w4uthsBom4UHMfA8d8Pc";
export const supabase: ReturnType<typeof createClient> = createClient(
  supabaseUrl,
  supabaseKey
);
if (!supabase) throw new Error("Couldn't retrieve supabase client");
