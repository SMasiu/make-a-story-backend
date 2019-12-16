import { Router } from 'express';
import addNewFragment from './add';

const router = Router();

router.post('/', addNewFragment);

export default router;