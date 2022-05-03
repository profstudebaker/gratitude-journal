
// https://github.com/Ngineer101/nextjs-supabase-crud/blob/main/pages/api/auth.js  
import { supabase } from '../../lib/supabase'

export default function AuthHandler(req, res) {
  // called when the UserContextProvider sends a request here
  // we add a cookie with our session info
  supabase.auth.api.setAuthCookie(req, res)
}