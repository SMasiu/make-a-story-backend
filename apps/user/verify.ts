import { verifyToken } from "./token"
import db from '../../database/database';
import { notFound, serverError } from "../../http/server-response";

const verify = async (req: any, res: any) => {
    let { id, valid } = await verifyToken(req, res, true);

    if(!valid) {
        return res.send({
            valid
        });
    }

    try {
        let response = await db.client.query(`
            SELECT nick, email FROM users WHERE id = $1 LIMIT 1;
        `,[id]);
        
        if(response.rows.length) {
            const {email, nick} = response.rows[0];
            return res.send({
                id,
                nick,
                email,
                valid
            });

        } else {
            return notFound(res);
        }

    } catch {
        return serverError(res);
    }

}

export default verify;