/*

Name: Hailey Thompson
Date: November 16, 2026
CSC 372

This is the file for handling user interactions for the Triviabook webpage.
This includes, retrieving topics and displaying trivia questions. 

*/

import { checkAnswer } from "../controllers/questions";

//DOM selections
let topicsButton = document.querySelector("#load-topics");
let topicsList = document.querySelector("#topics-list");
let questionsList = document.querySelector("#questions-list");
let selectQuestion = document.querySelector("#selected-question");
let answerForm = document.querySelector("#answer-form");
let answerInput = document.querySelector("#answer-input");
let answerResult = document.querySelector("#answer-result");

//stores question id selected by the user 
let selectedQuestionId = null;

topicsButton.addEventListener("click", loadTopics);
answerForm.addEventListener("submit", checkAnswer);

/* gets the questions from the express API */
async function loadTopics() {
    try {
        let response = await fetch("/triviabook/topics");

        //if there is an error while trying to get the info
        if (!response.ok) {
            throw new Error("Failed to load topics");
        }

        //an array 
        let topics = await response.json();

        //clearing the loop before 
        topicsList.textContent = "";

        for (let topic of topics) {
            let item = document.createElement("li");

            let topicButton = document.createElement("button");
            topicButton.textContent = topic.name;

            topicButton.addEventListener("click", () => {
                loadQuestions(topic.name);
            });

            //appending it to the page
            item.appendChild(topicButton);
            topicsList.appendChild(item);
        }
    }
    catch (error) {
        topicsList.textContent = "Unable to load topics."
        console.error(error);
    }

}

//gets the trivia questions for a topic that is selected 
async function loadQuestions(topicName) {
    try {
        let url = `/triviabook/topic/${encodeURIComponent(topicName)}`;

        //fetching the url
        let response = await fetch(url);

        //checking if the response worked
        if (!response.ok) {
            throw new Error("Failed to load questions");
        }

        let questions = await response.json();

        //reset old answers 
        selectedQuestionId = null;
        selectedQuestion.textContent = "No question selected.";

        //clearing previous answers
        questionsList.textContent = "";

        for (let question of questions) {
            let item = document.createElement("li");

            let questionButton = document.createElement("button");
            questionButton.textContent = question.question;

            questionButton.addEventListener("click", () => {
                selectedQuestionId = question.id;
                selectedQuestion.textContent = question.question;
            });

            item.appendChild(questionButton);
            questionsList.appendChild(item);
            
        }
    }
    catch (error) {
        questionsList.textContent = "Unable to load questions...";
        console.error(error);
    }
}

//handles the submission of a trivia answer
async function checkAnswer(event){
    event.preventDefault();
}




