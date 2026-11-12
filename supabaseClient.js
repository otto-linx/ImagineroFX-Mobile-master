import { createClient } from '@supabase/supabase-js';

// URL y clave pública de tu proyecto Supabase (solo para pruebas, no producción)
const SUPABASE_URL = 'https://pfhrhsrvuzwawqxkgvsd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmaHJoc3J2dXp3YXdxeGtndnNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MTYzMjYsImV4cCI6MjA2NTA5MjMyNn0.OOxQmkqv--YH4NPxyYp7RukO1H7qUuTkAi3XIaPxOnI'
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
console.log('URL:', SUPABASE_URL);
console.log('KEY:', SUPABASE_KEY.slice(0, 10) + '...'); // no muestres todo
