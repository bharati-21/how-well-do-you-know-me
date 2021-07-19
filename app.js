/*
  This is the main module that connects all modules and makes calls to functions in other modules
*/

// Importing all the required libraries.
const clear = require('clear');
const boxen = require('boxen');
const chalk = require('chalk');
const ora = require('ora');
const wrap = require('word-wrap');
const Spinner = require('cli-spinner').Spinner;

// Importing all required modules
/*
  - welcome module: welcomes the user to the quiz game, and prints instructions
  - questions module: contains 10 questions in the form of an array of object
  - quiz module: displays questions, allows user to enter their answer, checks the answer and also updates score. Returns final score to this module
*/

const welcomeModule = require('./welcome.js');
const questionsModule = require('./questions.js');
const quizModule = require('./quiz.js');


// Variables to hold user names and whether user wishes to take the quiz
var userName = "";
var beginQuiz = "";


// Variable to hold score.
var score = 0;


start();

// The main function in the module

function start() {
  console.log('Starting');

  // Calling the welcome(). Prints instructions and welcome message
  const welcomeModuleRes = welcomeModule.welcome();
  
  userName = welcomeModuleRes.userName;
  beginQuiz = welcomeModuleRes.beginQuiz;

  if(beginQuiz !== 'exit') {
    const questions = questionsModule.questions;
    const quiz = quizModule.quiz;  

    const quizResults = quiz(questions);
    score = quizResults.score;
    
    calculateScore();      
  }
}



// Function that prints score card after checking levels and score
function calculateScore() {
  var spinner = new Spinner('Caclulating Your Score... %s');
  spinner.setSpinnerString("* -–—–- *");
  spinner.start();

  levelOneBox = {
    padding: 2,
    margin: 2,
    align: 'center',
    borderColor: 'red',
    backgroundColor: '#333'
  };

  levelTwoBox = {
    padding: 2,
    margin: 2,
    align: 'center',
    borderColor: 'yellow',
    backgroundColor: '#333'
  };

  levelThreeBox = {
    padding: 2,
    margin: 2,
    align: 'center',
    borderColor: 'green',
    backgroundColor: '#333'
  };


  setTimeout(() => {
    spinner.stop(true);
    clear();
      
    
    var text = chalk.bold.underline.blackBright.bgWhiteBright("SCORE CARD");

    // If user was has a score less than or equal to 3
    if(score <= 3) { 
      text += printScoreCard('red') +  "\n" + chalk.bold.bgRedBright.black('YOU DO NOT KNOW BHARATI WELL!\n\nBETTER LUCK NEXT TIME!');

      console.log(boxen(
       text,
        levelOneBox));
    }

    // If user was at leve1 2 when the quiz ended
    else if(score > 3 && score <7) {
      text += printScoreCard('yellowBright') +  "\n" + chalk.bold.bgYellowBright.black('YOU KNOW BHARATI WELL!\n\nGREAT JOB!');
      console.log(boxen(
        text, 
      levelTwoBox));
    }

    // If user has a score greater than or equal to 7
    else {
      text += printScoreCard('green') +  "\n" + chalk.bold.bgGreenBright.black('YOU ARE A GREAT FRIEND!\n\nYOU KNOW BHRARATI REALLY WELL.\n\n\nCONGRATULATIONS!');
      console.log(boxen(
        text, 
      levelThreeBox));
    }
  }, 4000);
}


function printScoreCard(color) {
  var text = chalk.bold `
        \nFINAL SCORE: {${color} ${score}} 
    `;
    return text.toString();
}