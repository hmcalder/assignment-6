import { getTopicByName } from "../models/topics.js";
import { getQuestionsByTopic, getRandomQuestion, getQuestionById } from "../models/questions.js";


async function listQuestionsByTopic(req, res) {
    const topicName = req.params.topic;
    const limit = req.query.limit;
    const difficulty = req.query.difficulty;

    const topic = await getTopicByName(topicName);


    //handling if it doesn't exist 
    if(!topic) return res.status(404).json({error: 'Topic not found'});

    //get questions that go to topic
    let questions = await getQuestionsByTopic(topic.id);

    //filtering questions by difficulty if they are given 
    if(difficulty){
        questions = questions.filter(q => q.difficulty === difficulty);
    }

    //limit the number of questions if they are given 
    if(limit){
        questions = questions.slice(0, Number(limit));
    }

    res.json(questions);
}

async function randomQuestion(req, res){
    const question = await getRandomQuestion();

    if(!question){
        return res.status(404).json({error: 'No questions were found'});
    }

    res.json({
        id: question.id,
        topic_id: question.topic_id,
        question: question.question,
        difficulty: question.difficulty
    });
}

async function checkAnswer(req, res){
    const id = req.body.id;
    const guess = req.body.guess;


    //if bad request 
    if(!id || !guess){
        return res.status(400).json({error: 'Missing required parameter'});
    }

    const question = await getQuestionById(id);
    //if now answer 
    if(!question){
        return res.status(404).json({error: 'Question was not found'});
    }

    //compare the users guess with the actual answer 
    const isCorrect = guess.trim().toLowerCase() === question.answer.trim().toLowerCase();

    res.json({
        correct: isCorrect,
        answer:question.answer
    });
}

export {listQuestionsByTopic, randomQuestion, checkAnswer};