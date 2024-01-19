import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://esitrbebvfuklmywupyu.supabase.co";
const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzaXRyYmVidmZ1a2xteXd1cHl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDUyNDEyMDcsImV4cCI6MjAyMDgxNzIwN30.YP_zaALZ8JNo9tqe8JFPPZV2hr477E969OLICFitdBo";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
