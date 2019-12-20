import { verifyToken } from "../user/token";
import { badRequest, serverError, notFound } from "../../http/server-response";
import db from "../../database/database";

const addVote = async (req: any, res: any) => {

    const {id} = await verifyToken(req,res);
    const { fragmentId } = req.body;

    if(await validate({fragmentId, uid: id}, res)) {

        try {
            const response = await Promise.all([
                db.client.query(`
                    SELECT v.fragment, v.user_id, n.story
                    FROM votes v
                    JOIN new_fragments n ON n.id = v.fragment
                    WHERE v.user_id = $1
                `,[id]),
                db.client.query(`
                    SELECT story FROM new_fragments WHERE id = $1
                `,[fragmentId])
            ]);

            if(!response[1].rows[0]) {
                return notFound(res);
            }
            const storyId = response[1].rows[0].story;
            let index = response[0].rows.findIndex( i => i.story === storyId );
            let isNew = index === -1;

            if(isNew) {
                
                try {
                    await db.client.query(`
                        INSERT INTO votes (fragment, user_id) VALUES ($1, $2)
                    `,[fragmentId, id]);
                    return res.send({fragmentId, updatedFrom: -1});
                } catch {
                    return serverError(res);
                }

            } else {
                try {
                    let fId = response[0].rows[index].fragment;
                    await db.client.query(`
                        UPDATE votes SET fragment = $1 WHERE user_id = $2 AND fragment = $3;
                    `,[fragmentId, id, fId])

                    return res.send({fragmentId, updatedFrom: fId});
                } catch {
                    return serverError(res);
                }
            }

        } catch {
            serverError(res);
            return false;
        }

    }

}

const validate = async ({fragmentId, uid}: any, res: any) => {
    if(!fragmentId) {
        badRequest(res);
        return false;
    }
    return true;
}

export default addVote;