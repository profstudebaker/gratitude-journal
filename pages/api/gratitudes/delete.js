import { supabase } from '../../../lib/supabase'

export default async function deleteGratitudes(req, res) {
    const { user } = await supabase.auth.api.getUserByCookie(req)
    supabase.auth.setAuth(req.cookies["sb-access-token"])
    const { data, error } = await supabase
        .from('gratitudes')
        .delete()
        .match({ id: user.id });

    console.log(data)
    console.log('error: ', error)
    if (error) { res.status(403).json({ message: 'something went wrong'})}
    else { res.status(200).json(data) }
}