import { serverError } from "../../http/server-response"
import db from "../../database/database";

const countNewFragments = async (req: any, res: any) => {

    const {storyId} = req.params;

    try {

        const response = await db.client.query(`
            SELECT COUNT(id) FROM new_fragments WHERE story = $1
        `,[storyId]);

        return res.send({count: parseInt(response.rows[0].count)});

    } catch {
        return serverError(res);
    }

}

export default countNewFragments;