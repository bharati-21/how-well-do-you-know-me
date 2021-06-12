/*
 * This module has quiz() that takes in the 10 unique questions in the form of array of objects.
 * These questions are displayed to the user, and user enters the choice of answer
 * This answer is checked with the original answer and the score is updated
 * The final score is returned along with number of levels, number of questions attempted and whether the user ended the quiz abruptly
 */

const readLineSync = require('readline-sync');
const chalk = require('chalk');
const boxen = require('boxen');


var score = 0;
var i = 0;

function quiz(questions) {
  
  for(; i<questions.length; i++) {
    var question = questions[i];
    displayQuestion(i+1, question.question, question.answer);
  }
    
  return {score};
}

function displayQuestion(index, question, answer) {
  var userAns = "";
  while(userAns !== 'a' && userAns!== 'b' && userAns!== "c" && userAns!== 'd' && userAns!== "exit") {
    const ques = chalk.bold.black(`${index}. ${question}`);

    const quesBox = {
      padding: 1,
      margin: {left:0, top:1, right:0, bottom:1},
      borderColor: '#fff',
      backgroundColor: '#fff',
    }

    userAns = (readLineSync.question(boxen(ques, quesBox))).toLowerCase();
    
    if(userAns === "exit") {
      process.exit(0);
    }
  
    if(userAns !== 'a' && userAns!== 'b' && userAns!== "c" && userAns!== "d") {
      console.log('Invalid Input. Please attempt the question again.');
    }
  }
  checkAnswer(userAns, answer);
}

function checkAnswer(userAns, answer) {
  const wrongAnsBox = {
      padding: 1,
      margin: {bottom: 1},
      borderColor: '#FF0000',
      backgroundColor: '#FFE4B5',
  }

  const corAnsBox = {
      padding: 1,
      margin: {bottom: 1},
      borderColor: 'green',
      backgroundColor: '#b3ffb3'
  }

  const levelBox = {
    padding: 1,
    margin: 2,
    borderColor: 'cyan',
    backgroundColor: 'yellow'
  }


  if(userAns === answer) {
    console.log(`You answered: ${userAns}`);
    console.log(boxen(chalk.bold.black('Correct Answer'),corAnsBox));
    score++;
  }
   else {
    console.log(`You answered: ${userAns}`);
    console.log(boxen(chalk.bold.black(`Wrong Answer.\nThe correct answer is: ${answer}`), wrongAnsBox));
  }

}

module.exports = {
  score,
  quiz
}