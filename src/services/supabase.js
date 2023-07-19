import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://tspqgwrxxxlqoeeyyphb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzcHFnd3J4eHhscW9lZXl5cGhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkyNzMyMzMsImV4cCI6MjAwNDg0OTIzM30.FFeowOTN1xzv8UKmHJfsDMRoymCMGliqA5uaCNf9DoA";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
