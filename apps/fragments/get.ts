import db from "../../database/database"
import { serverError, notFound } from "../../http/server-response";

const getFragments = async (req: any, res: any) => {

    const { story } = req.params;
    const offset = parseInt(req.query.offset || 0);
    try {
        const response = await db.client.query(`
            SELECT 
                f.content, f.pub_date, f.pos_num, u.nick
                FROM fragments f
                JOIN users u ON f.author = u.id
                WHERE story = $1
                LIMIT 10
                OFFSET $2
        `,[story, offset]);

        if(response.rows.length) {
            return res.send(response.rows);
        } else {
            return notFound(res);
        }

    } catch {
        return serverError(res);
    }

}

export default getFragments;