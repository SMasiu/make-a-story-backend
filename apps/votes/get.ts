import { verifyToken } from "../user/token"
import db from "../../database/database";
import { serverError } from "../../http/server-response";

const getVotes = async (req: any, res: any) => {

    const { id } = await verifyToken(req, res);

    try {
        const response = await db.client.query(`
            SELECT fragment, user_id FROM votes WHERE user_id = $1
        `, [id]);

        return res.send(response.rows);
    } catch {
        return serverError(res);
    }


}

export default getVotes;