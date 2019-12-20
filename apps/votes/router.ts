import { Router } from 'express';
import addVote from './add';
import getVotes from './get';

const router = Router();

router.post('/', addVote);
router.get('/', getVotes);

export default router;