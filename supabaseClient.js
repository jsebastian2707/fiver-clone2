import { createClient } from '@supabase/supabase-js';

// Reemplaza con tu URL de Supabase
const supabaseUrl = 'https://lerphrfifvbjimooccgb.supabase.co';  // Tu URL de Supabase
// Reemplaza con tu clave anónima (anon key) de Supabase
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlcnBocmZpZnZiamltb29jY2diIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxMDg0NjksImV4cCI6MjA2MjY4NDQ2OX0.VOhHV2mC9hEJf4rGa7eytpVhfv5svE5gxmdPYDEWfDg';  // Tu clave API (anon key)

// Crear la conexión con Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
