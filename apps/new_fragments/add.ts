import { verifyToken } from "../user/token";
import { badRequest, serverError } from "../../http/server-response";
import db from "../../database/database";

const addNewFragment = async (req: any, res: any) => {

    const { content, storyId } = req.body;
    
    const decoded = await verifyToken(req, res);

    const newFr = {
        content,
        author: decoded.id,
        story: storyId
    }

    if(await validate(newFr, res)) {
        try {
            await db.client.query(`
                INSERT INTO new_fragments (content, author, story) VALUES ($1,$2,$3)
            `, [newFr.content, newFr.author, newFr.story]);

            return res.send({...newFr});

        } catch {
            return serverError(res);
        }
    }
}

const validate = async ({content, author, story}: any, res: any) => {

    if(!author || !story || !content) {
        badRequest(res);
        return false;
    }

    if(content.length > 5000 || !content.length) {
        badRequest(res);
        return false;
    }

    try {
        const response = await db.client.query(`
            SELECT author, story FROM new_fragments WHERE story = $1 AND author = $2
        `, [story, author]);

        if(response.rows.length) {
            badRequest(res);
            return false;
        }

    } catch {
        serverError(res);
        return false;
    }
    return true;

}

export default addNewFragment;