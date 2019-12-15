import Express from 'express';
import getStories from './get';

const router = Express.Router();

router.get('/', getStories);

export default router;