import { supabase } from '../../../lib/supabase'

/* 
    An example of using NextJS API routes 
    to get the authenticated user and query the database
    that has row level security enabled.
*/
export default async function fetchAll(req, res) {
    // tell supabase who the user is before we query
    supabase.auth.setAuth(req.cookies["sb-access-token"])
    // get all gratitudes for this user
    // filtering for the logged in user happens automatically with rls
    const { data: gratitudes, error } = await supabase
            .from('gratitudes')
            .select('*')

    if (error) { res.status(403).json({ message: 'something went wrong'})}
    else { res.status(200).json(gratitudes) }
}