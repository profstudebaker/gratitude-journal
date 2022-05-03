import { supabase } from '../../../lib/supabase'

// TODO
export default async function deleteGratitudes(req, res) {
    const { user } = await supabase.auth.api.getUserByCookie(req)
    supabase.auth.setAuth(req.cookies["sb-access-token"])
    const { data, error } = await supabase
        .from('gratitudes')
        .delete()
        .match({ id: user.id });

    if (error) { res.status(403).json({ message: 'something went wrong'})}
    else { res.status(200).json(data) }
}