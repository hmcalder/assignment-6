/*

Name: Hailey Thompson
Date: November 16, 2026
CSC 372

This is the file for handling user interactions for the Triviabook webpage.
This includes, retrieving topics and displaying trivia questions. 

*/



//DOM selections
let topicsButton = document.querySelector("#load-topics");
let topicsList = document.querySelector("#topics-list");
let questionsList = document.querySelector("#questions-list");
let selectedQuestion = document.querySelector("#selected-question");
let answerForm = document.querySelector("#answer-form");
let answerInput = document.querySelector("#answer-input");
let answerResult = document.querySelector("#answer-result");
let randomButton = document.querySelector("#get-random-question");
let randomQuestionText = document.querySelector("#random-question-text");
let addQuestionForm = document.querySelector("#add-question-form");
let newTopic = document.querySelector("#new-topic");
let newQuestion = document.querySelector("#new-question");
let newAnswer = document.querySelector("#new-answer");
let newDifficulty = document.querySelector("#new-difficulty");
let addQuestionResult = document.querySelector("#add-question-result");

//stores question id selected by the user 
let selectedQuestionId = null;

//event listeners
topicsButton.addEventListener("click", loadTopics);
answerForm.addEventListener("submit", checkAnswer);
randomButton.addEventListener("click", loadRandomQuestion);
addQuestionForm.addEventListener("submit", addNewQuestion);

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
async function checkAnswer(event) {
    event.preventDefault();

    let guess = answerInput.value.trim();

    //see if the user selected a question
    if (selectedQuestionId === null) {
        answerResult.textContent = "Please first select a question!";
        return;
    }
    try {
        //post request 
        let response = await fetch("/triviabook/answer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: selectedQuestionId,
                guess: guess
            })
        });

        //checking to see if it loaded and worked 
        if (!response.ok) {
            throw new Error("Failed to check the answer.");
        }

        let result = await response.json();

        //displaying whether the answer was guessed correctly 
        if (result.correct) {
            answerResult.textContent = "Correct! The answer is " + result.answer;
        }
        else {
            answerResult.textContent = "Incorrect! Looks like you need to study... The correct answer is " + result.answer;
        }
    }
    catch(error){
        answerResult.textContent = "Unable to check answer.";
        console.error(error);
    }
}

//retrieves and displays a random question 
async function loadRandomQuestion(){
    try{
        let response = await fetch("/triviabook/random");

        //checking the response
        if(!response.ok) {
            throw new Error("Failed to load your random question.");
        }

        let question = await response.json();

        randomQuestionText.textContent = question.question;
        selectedQuestionId = question.id;
        selectedQuestion.textContent = question.question;

        //clear old results 
        answerResult.textContent = "";
    }
    catch(error) {
        randomQuestionText.textContent = "Unable to load the random questions...";
        console.error(error);
    }
}

async function addNewQuestion(event) {
    event.preventDefault();

    let topic = newTopic.value.trim(); 
    let question = newQuestion.value.trim();
    let answer = newAnswer.value.trim();
    let difficulty = newDifficulty.value;

    try{
        let response = await fetch("/triviabook/question/add", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                topic: topic,
                question: question,
                answer: answer,
                difficulty: difficulty
            })
        });

        if(!response.ok){
            throw new Error("Could not add the question.");
        }

        let result = await response.json();

        //put message onto the screen
        addQuestionResult.textContent = "Your question was successfully added!";
    }
    catch(error){
        addQuestionResult.textContent = "Question was not able to be added...";
        console.error(error);
    }
}





