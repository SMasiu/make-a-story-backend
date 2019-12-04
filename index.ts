import Express from 'express';
import db from './database/database_setup';
import userRouter from './apps/user/router';
import bodyParser from 'body-parser';

const app = Express();

app.use(bodyParser.json());
app.use('/user', userRouter);

db.createDatabase()
    .then( () => {
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch( err => {
        throw new Error(err);
    });
