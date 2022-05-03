
// https://github.com/Ngineer101/nextjs-supabase-crud/blob/main/pages/api/auth.js  
import { supabase } from '../../lib/supabase'

export default function AuthHandler(req, res) {
  supabase.auth.api.setAuthCookie(req, res)
}