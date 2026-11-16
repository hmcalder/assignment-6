import { getTopicByName } from "../models/topics.js";
import { getQuestionsByTopic, getRandomQuestion } from "../models/questions.js";

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

export {listQuestionsByTopic, randomQuestion};