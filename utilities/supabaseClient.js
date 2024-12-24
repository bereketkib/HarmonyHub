require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");

// Replace these with your Supabase project credentials
const SUPABASE_PROJECT_URL = "https://ebvxjatnftnrqlgjnift.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Initialize Supabase client
const supabase = createClient(SUPABASE_PROJECT_URL, SUPABASE_KEY);

module.exports = supabase;
