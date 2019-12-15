import db from "../../database/database"
import { serverError } from "../../http/server-response";

const countFragments = async (req: any, res: any) => {

    const { story } = req.params;
    try {

        const response = await db.client.query(`
            SELECT COUNT(id)
            FROM fragments
            WHERE story = $1
        `,[story]);

        return res.send({count: parseInt(response.rows[0].count)});

    } catch {
        return serverError(res);
    }
}

export default countFragments;