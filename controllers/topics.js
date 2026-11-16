import { getAllTopics } from "../models/topics.js";

async function listTopics(req, res){
    const topics = await getAllTopics();
    res.json(topics);
}

export {listTopics};