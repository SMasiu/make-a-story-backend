import bcrypt from 'bcrypt';

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

export const compare = () => {

}