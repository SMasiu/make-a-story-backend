import jwt from 'jsonwebtoken';
import { tokenKey } from '../../keys';
import cookie from 'cookie';
import { unauthorized } from '../../http/server-response';

export const saveToken = (id: string, res: any) => {
    const token = jwt.sign({id}, tokenKey);
    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
        httpOnly: true,
        maxAge: 604800,
        path: '/'
    }));
}

export const verifyToken = (req: any, res: any, onVerify: boolean = false): Promise<{id: string, valid: boolean}> => {
    return new Promise((resolve) => {
        let cookies = cookie.parse(req.headers.cookie || '');
        
        const { token } = cookies;

        jwt.verify(token, tokenKey, (err: any, decoded: any) => {
            if(err) {
                return onVerify ? resolve({valid: false, id: ''}) : unauthorized(res);
            }
            return resolve({...(<{id: string}>decoded), valid: true});
        });
    });
}