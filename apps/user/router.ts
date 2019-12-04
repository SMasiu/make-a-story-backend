import Express from 'express';
import register from './register';

const router = Express.Router();

router.post('/register', register);

export default router;