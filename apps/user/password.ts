import bcrypt from 'bcrypt';
import { serverError, unauthorized } from '../../http/server-response';

const saltRounds = 10;

export const hash = (password: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if(err) {
                return reject(err);
            }
            return resolve(hash);
        });
    })
}

export const comparePassword = (password: string, hash: string, res: any) => {
    return new Promise((resolve) => {
        return bcrypt.compare(password, hash)
            .then( valid => {
                if(valid) {
                    return resolve(true);
                } else {
                    return resolve(unauthorized(res));
                }
            })
            .catch( () => {
                return resolve(serverError(res));
            });
    });
}