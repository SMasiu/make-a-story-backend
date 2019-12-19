import db from '../../database/database';
import { serverError, notFound } from '../../http/server-response';
import { comparePassword } from './password';
import { saveToken } from './token';

const login = async (req: any, res: any) => {
    let {userName} = req.body;
    let pass = req.body.password;
    try {
        let response = await db.client.query(`
            SELECT nick, email, password, id FROM users WHERE ${(<string>userName).search('@') === -1 ? 'nick' : 'email'} = $1 LIMIT 1
        `,[userName]);

        if(response.rows.length) {
            
            const {nick, password, id, email} = response.rows[0];
            let valid =  await comparePassword(pass, password, res);

            if(valid === true) {

                saveToken(id, res);
                console.log(res)
                return res.send({
                    nick,
                    email,
                    id
                });
            }
        } else {
            return notFound(res);
        }
    } catch {
        return serverError(res);
    }
}

export default login;