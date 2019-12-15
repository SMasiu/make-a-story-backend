import db from '../../database/database';
import { serverError } from '../../http/server-response';

const getStories = async (req: any, res: any) => {

    try {
        const response = await db.client.query(`
            SELECT * FROM stories
        `);

        res.send(response.rows);

    } catch {
        return serverError(res);
    }

}

export default getStories;