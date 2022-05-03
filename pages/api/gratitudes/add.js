import { supabase } from '../../../lib/supabase'

export default async function addGratitude(req, res) {
    const { user } = await supabase.auth.api.getUserByCookie(req)
    supabase.auth.setAuth(req.cookies["sb-access-token"])
    const entry = req.query.entry
    console.log("Adding" + entry + " to database....")
    const { data: gratitudes, error } = await supabase
        .from('gratitudes')
        .insert([
        { id: user.id, entry: entry },
    ])
    if (error) { res.status(403).json({ message: 'something went wrong'})}
    else { res.status(200).json(gratitudes) }
}