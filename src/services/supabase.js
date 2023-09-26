
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://sbpazkchfdwkzujzuxvj.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNicGF6a2NoZmR3a3p1anp1eHZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIzNjQ1NzUsImV4cCI6MjAwNzk0MDU3NX0.LYWfeBiok_FkEqng6mP-ultFElUzOWln-iJt6BkO-wg"
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase