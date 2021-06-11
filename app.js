/*
  This is the main module that connects and makes calls to all functions
*/

// Importing all the required libraries.
const clear = require('clear');
const boxen = require('boxen');
const chalk = require('chalk');
const ora = require('ora');
const Spinner = require('cli-spinner').Spinner;

// Importing all required modules
/*
  - welcome module: welcomes the user to the quiz game, and prints instructions
  - questions module: contains 50 questions in the form of an array of object
  - quiz module: displays 10 questions, allows user to enter their answer, checks the answer and also updates score. Returns final score to this module
  - highScore module holds the high scores in the form of an array of object
*/

const welcomeModule = require('./welcome.js');
const questionsModule = require('./questions.js');
const quizModule = require('./quiz.js');
const highScore = require('./highscores.js');


// Calling the welcome(). Prints instructions and welcome message
welcomeModule.welcome();

// Variables to hold user names and whether user wishes to take the quiz
const userName = welcomeModule.userName;
const beginQuiz = welcomeModule.beginQuiz;


// Variables to hold score, level users passed, number of questions user has attempted and whether user exited the quiz abruptly.
var score = 0;
var numLevels = 0;
var numQuesAttempted = 0;
var finishedAbruptly = false;


/*/
  If user chooses to "start" the quiz, then:
  1. Generate questions
  2. Call quiz() to display questions, take user answer input, check answer and update score.
  3. Save the quiz results and update "score", "numLevels", "numQuesAttempted" and "finishedAbruptly" Variables
  4. Call calculateScore() to print the final score card
*/

if(beginQuiz!== 'exit') {
  const generateQuestions = generateQuestionsModule.generateQuestions;
  const uniqueQues = generateQuestions(questionsModule.questions);

  const quiz = quizModule.quiz;  

  const quizResults = quiz(uniqueQues);
  score = quizResults.score;
  numQuesAttempted = quizResults.numQuesAttempted;
  numLevels = quizResults.numLevels;
  finishedAbruptly = quizResults.finishedAbruptly;
  calculateScore();

  setTimeout(() => {
    console.log(chalk.bgGray.whiteBright.bold.underline("\n\nRETURNING TO MAIN SCREEN...\n\n"));
  }, 10000);

  setTimeout(() => {
      clear();
      welcomeModule.welcome();
  }, 20000);
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

  exitBox = {
    padding: 2,
    margin: 2,
    align: 'center',
    borderColor: '#fff',
    backgroundColor: '#000'
  }

  setTimeout(() => {
    spinner.stop(true);
    clear();
      
    // If the user ended the quiz abruptly
    if(finishedAbruptly === true) {
      var text = chalk.bold.bgWhiteBright.blackBright('YOU ENDED THE QUIZ ABRUPTLY');
      text += printScoreCard('cyanBright');
      console.log(boxen(text, exitBox))
    }

    // If the user completed all 10 questions in the quiz
    else {
        var text = chalk.bold.underline.blackBright.bgWhiteBright("SCORE CARD");

        // If user was at evel 0 or 1 when the quiz ended
        if(numLevels <= 1) { 
          text += printScoreCard('redBright') +  "\n" + chalk.bold.bgRedBright.black('BETTER LUCK NEXT TIME!');

          console.log(boxen(text, levelOneBox));
        }

        // If user was at leve1 2 when the quiz ended
        else if(numLevels > 1 && numLevels <=2) {
          text += printScoreCard('yellowBright') +  "\n" + chalk.bold.bgYellowBright.black('GREAT JOB!');
          console.log(boxen(text, levelTwoBox));
        }

        // If user was at level other than 1 and 2 when the quiz ended
        else {
          text += printScoreCard('green') +  "\n" + chalk.bold.bgGreenBright.black('CONGRATULATIONS. YOU ARE A POTTERHEAD PRO!!');
          console.log(boxen(text, levelThreeBox));
        }
        checkHighScore();
    }
  }, 4000);
}


function printScoreCard(color) {
  var text = chalk.bold `
        \nNUMBER OF QUESTIONS ATTEMPTED: {${color} ${numQuesAttempted}}
        \nFINAL LEVEL: {${color} ${numLevels}}
        \nFINAL SCORE: {${color} ${score}} 
    `;
    return text.toString();
}

// Checks if user reached high score. If yes congratulates the user, and also Prints other high scores
function checkHighScore() {
   const highScores = highScore.highScores;
   var flag = false;

  // Loop thorugh the high data
   highscores.forEach((currScore, index) => {
      if(score >= highScores[0] && flag!=true) {
          flag = true;
          const item = {
            userName: userName,
            numQuesAttempted: numQuesAttempted,
            numLevels: numLevels,
            score: score
          }
          highScores.splice(index+1, 0, item);
      }
   });
    
  if(flag == true) {
    setTimeout(() => {
        console.log(chalk.bold.underline.magentaBright('\n\nCONGRATULATIONS! YOU ARE A HIGH SCORER!!\n'));
        console.log(chalk.bold.yellow('Please take a screenshot of your score card and send it to me!\n\n'));

    }, 6000);

  // Print high scorers
    const box = {
          padding: 1,
          margin: {bottom: 2, top: 1, left: 0, right: 0},
          borderColor: '#333',
          backgroundColor: '#f4f4f4',
          border: 'classic'
    }

    var text = chalk.bold.underline.red('HIGH SCORERS');
    highScores.forEach((player) => {
        text+= chalk`
         \nNAME: {red ${player.userName}}
         \nNUMBER OF LEVELS PASSED: {red ${player.numLevels}}
         \nNUMBER OF QUESTIONS ATTEMPTED: {red ${player.numQuesAttempted}}
         \nFINAL SCORE: {red ${player.score}}
         \n
        `;
    });

    setTimeout( () => {
      console.log(boxen(text, box)); 
    }, 8000);    
  }     
}


