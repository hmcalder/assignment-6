import {Router} from 'express';
import { listQuestionsByTopic, randomQuestion } from '../controllers/questions.js';

const router = Router();

router.get('/:topic', listQuestionsByTopic);
router.get('/', randomQuestion);

export default router;