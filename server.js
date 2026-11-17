import express from 'express';
import topicsRouter from './routes/topics.js';
import questionsRouter from './routes/questions.js';


const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use('/triviabook/topics',topicsRouter);
app.use('/triviabook/topic', questionsRouter);
app.use('/triviabook/random', questionsRouter);
app.use('/triviabook/answer', questionsRouter);
app.use('/triviabook/question', questionsRouter);

app.get('/', (req, res) => {
    res.send('Hello, Express')
});

app.listen(3000, () => console.log('Listening on 3000'));