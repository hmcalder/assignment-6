import {Router} from 'express';
import { listTopics } from '../controllers/topics.js';

const router = Router();

router.get('/', listTopics);

export default router;