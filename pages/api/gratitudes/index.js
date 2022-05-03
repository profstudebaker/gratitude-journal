import { supabase } from '../../../lib/supabase'

export default async function fetchAll(req, res) {
    // const { user } = await supabase.auth.api.getUserByCookie(context.req)
    supabase.auth.setAuth(req.cookies["sb-access-token"])
    const { data: gratitudes, error } = await supabase
            .from('gratitudes')
            .select('*')

    if (error) { res.status(403).json({ message: 'something went wrong'})}
    else { res.status(200).json(gratitudes) }
}