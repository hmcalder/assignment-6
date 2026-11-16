import{pool} from '../database.js';

async function getAllTopics() {
    const result = await pool.query('SELECT * FROM topics');
    return result.rows;
}

async function getTopicByName(name){
    const result = await pool.query(
        'SELECT * FROM topics WHERE name = $1',
        [name]
    );

    return result.rows[0];
}

export {getAllTopics, getTopicByName};