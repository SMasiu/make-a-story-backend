import Express from 'express';
import register from './register';
import login from './login';
import verify from './verify';

const router = Express.Router();

router.get('/verify', verify);
router.post('/login', login);
router.post('/register', register);

export default router;