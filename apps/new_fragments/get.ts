import db from "../../database/database";
import { serverError } from "../../http/server-response";

const getNewFragments = async (req: any, res: any) => {

    const {storyId} = req.params;
    const offset = parseInt(req.query.offset || 0);

    try {
        
        const request = await db.client.query(`
            SELECT f.content, f.id, u.nick
            FROM new_fragments f
            JOIN users u ON u.id = f.author
            WHERE story = $1 
            LIMIT 10 
            OFFSET $2
        `,[storyId, offset]);

        res.send(request.rows)

    } catch {
        return serverError(res);
    }


}

export default getNewFragments;