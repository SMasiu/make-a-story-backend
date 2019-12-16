import { verifyToken } from "../user/token";

const addNewFragment = async (req: any, res: any) => {

    const { content } = req.body;
    console.log(content)
    const decoded = await verifyToken(req, res, true);

    console.log(decoded)

    res.send({x: 's'})

}

export default addNewFragment;