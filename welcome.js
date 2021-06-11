/*
 This module welcomes the user and prints instructions. 
 This module also gives user a chance to choose whether they wants to take the quiz or leave.
*/


// Importing required libraries
const chalk = require('chalk');
const readLineSync = require('readline-sync');
const boxen = require('boxen');
const log = console.log;

// Importing required modules
const instructions = require('./instructions.js');


var userName = '';
var beginQuiz = '';

function welcome() {
  // Title text
  const title = chalk.blue.bold("WELCOME TO THE HARRY POTTER TRIVIA QUIZ");

  // Adding box styles to the title
  const titleBox = {
    padding: 1,
    margin: 2,
    borderColor: '#4682b4',
    backgroundColor: '#fff',
    borderStyle: 'double',
    align: 'center'
  }

  // logging title to the screen
  log(boxen(title, titleBox));

  // Asking for user's name
  userName = readLineSync.question('What is your name? ');

  // Welcoming the user
  log(`\nWelcome`, chalk.bold.blueBright(userName));

  let beginQuiz = "";
  
  // Logging instructions on the screen from the "instructions" module
  log(instructions.instruction);

  // Until user enters "exit" or "start"
  while(beginQuiz!== "exit" && beginQuiz!=="start") {
     beginQuiz = readLineSync.question(`Enter "start" to play the quiz or "exit" to leave. `).toLowerCase();
  }

  if(beginQuiz === 'exit') {
    const sorryBox = {
      padding: 1,
      margin: {top: 1, bottom: 1, left:0, right: 0},
      borderStyle: 'bold',
      borderColor: 'red',
    }

    // if user chooses to exit the game, then display this message
    console.log(boxen('Sorry to see you go! Do come back and play.', sorryBox));
  }
  else {
    // Welcoming the user if they choose to take the quiz
    const welcomeBox = {
      padding: 1,
      margin: {top: 1, bottom: 0, left:0, right: 0},
      borderStyle: 'singleDouble',
      borderColor: 'cyan',
    }
    console.log(boxen('Thank you for chossing to play!',welcomeBox));
  }
}

// Exporting username, welcome() and begin quiz
module.exports = {
  welcome,
  userName,
  beginQuiz: beginQuiz.toLowerCase()
};
