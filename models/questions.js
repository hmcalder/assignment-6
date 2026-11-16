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


export {getQuestionsByTopic, getRandomQuestion, getQuestionById};