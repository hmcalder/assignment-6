import {Router} from 'express';
import { listQuestionsByTopic, randomQuestion, checkAnswer, addNewQuestion } from '../controllers/questions.js';

const router = Router();

router.get('/:topic', listQuestionsByTopic);
router.get('/', randomQuestion);
router.post('/', checkAnswer);
router.post('/add', addNewQuestion);

export default router;