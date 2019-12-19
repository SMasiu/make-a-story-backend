import { Router } from 'express';
import addNewFragment from './add';
import getNewFragments from './get';
import countNewFragments from './count';

const router = Router();

router.get('/:storyId', getNewFragments);
router.get('/count/:storyId', countNewFragments);
router.post('/', addNewFragment);

export default router;