import Express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import db from './database/database';
import userRouter from './apps/user/router';
import storiesRouter from './apps/stories/router';
import fragmentsRouter from './apps/fragments/router';
import newFragmentsRouter from './apps/new_fragments/router';
import serverErrorMiddleware from './middlewares/server-error';

const app = Express();

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(Express.static('public'));
app.use(bodyParser.json());
app.use('/user', userRouter);
app.use('/stories', storiesRouter);
app.use('/fragments', fragmentsRouter);
app.use('/news', newFragmentsRouter);
app.use('*', serverErrorMiddleware);

db.createDatabase()
    .then( () => {
        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch( err => {
        console.log(err)
        // throw new Error(err);
    });
