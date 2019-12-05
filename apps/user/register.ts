import validator from 'validator';
import db from '../../database/database';
import { hash } from './password';
import { saveToken } from './token';
import { badRequest, serverError } from '../../http/server-response';

const register = async (req: any, res: any) => {
    
    if(validate(req.body)) {

        const {nick, email, password} = req.body;

        try {
            
            let response = await db.client.query(`
                SELECT id FROM users WHERE nick = $1 OR email = $2 LIMIT 1;
            `, [nick, email]);

            if(response.rows.length) {
                return res.status(400).json({message: 'This name or email have alredy been used'});
            }

            try {
                const hashed = await hash(password);
                try {
                    await db.client.query(`
                        INSERT INTO users (nick, email, password) VALUES ($1, $2, $3);
                    `,[nick, email, hashed]);

                    let response = await db.client.query(`SELECT currval('users_id_seq');`);
                    let id = response.rows[0].currval;

                    saveToken(id, res);

                    return res.send({email, nick, id});

                } catch {
                    return serverError(res);
                }

            } catch {
                return serverError(res);
            }

        } catch {
            return serverError(res);
        }

    } else {
        return badRequest(res);
    }
}

const validate = ({email, password, confirmPassword, nick}: {[key: string]: string}) => {
    
    if(!validator.isEmail(email)) {
        return false;
    }

    if(password !== confirmPassword) {
         return false;
    }

    if(nick.search('@') !== -1) {
        return false;
    }

    if(password.length < 5) {
        return false;
    }

    if(nick.length > 20 || email.length > 100) {
        return false;
    }

    return true;

}

export default register;