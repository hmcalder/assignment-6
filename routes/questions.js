import {Router} from 'express';
import { listQuestionsByTopic, randomQuestion, checkAnswer } from '../controllers/questions.js';

const router = Router();

router.get('/:topic', listQuestionsByTopic);
router.get('/', randomQuestion);
router.post('/', checkAnswer);

export default router;