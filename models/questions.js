import {pool} from '../database.js';

async function getQuestionsByTopic(topicId){
    const result = await pool.query(
        'SELECT * FROM questions WHERE topic_id = $1',
        [topicId]
    );


    return result.rows;
}

async function getRandomQuestion(){
    const result = await pool.query('SELECT * FROM questions');
    const randomIndex = Math.floor(Math.random()*result.rows.length);

    return result.rows[randomIndex];
}

async function getQuestionById(id){
    const result = await pool.query('SELECT * FROM questions WHERE id = $1', [id]);

    return result.rows[0];
}

async function addQuestion(topic, question, answer, difficulty){
    const topicResult = await pool.query('SELECT * FROM topics WHERE name = $1', [topic]);

    let topicId;

    //if the topic doesnt exist
    if(topicResult.rows.length === 0){
        const newTopic = await pool.query('INSERT INTO topics (name) VALUES ($1) RETURNING *', [topic]);
        
            topicId = newTopic.rows[0].id;
    }

        //if the topic exists 
        else{
            topicId = topicResult.rows[0].id;
        }


        //adds new question 
        await pool.query(
            'INSERT INTO questions (topic_id, question, answer, difficulty) VALUES ($1, $2, $3, $4)',
            [topicId, question, answer, difficulty]
        );

        //return updated list of questions 
        return getQuestionsByTopic(topicId);
    }



export {getQuestionsByTopic, getRandomQuestion, getQuestionById, addQuestion};