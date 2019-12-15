import {Router} from 'express';
import getFragments from './get';
import countFragments from './count';

const router = Router();

router.get('/:story', getFragments);
router.get('/count/:story', countFragments);

export default router;