import { verifyToken } from "./token"
import db from '../../database/database';
import { notFound, serverError } from "../../http/server-response";

const verify = async (req: any, res: any) => {
    let { id } = await verifyToken(req, res);

    try {
        let response = await db.client.query(`
            SELECT nick FROM users WHERE id = $1 LIMIT 1;
        `,[id]);
        
        if(response.rows.length) {

            return res.send({
                id,
                nick: response.rows[0].nick
            });

        } else {
            return notFound(res);
        }

    } catch {
        return serverError(res);
    }

}

export default verify;