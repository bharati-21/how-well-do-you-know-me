# HOW WELL DO YOU KNOW ME?
This is a fun quiz to test my close-friends and family on how well they know me.

[Take the quiz here](https://replit.com/@bhaaratii/how-well-do-you-know-me?embed=1&output=1#README.md)


## MODULES IN THE APPLICATION
1. [app.js](https://github.com/bharati-21/how-well-do-you-know-me/blob/main/app.js)
   * This is the ***main module*** that connects all modules and makes calls to functions in other modules.
   * This module calles the welcome function in the `welcome.js` module, which welcomes the user to the game.
   * The `questions.js` module contains 10 questions in the form of an array of object
   * The `quiz.js` module displays questions, allows user to enter their choice, checks the answer and also updates score.
   * This module then finally displays score card for the user, and exits the game.

1. [welcome.js](https://github.com/bharati-21/how-well-do-you-know-me/blob/main/welcome.js)
   * This module has a `welcome()` method that asks for the user's name and then displays instructions after importing them from the `instructions.js` module.
   * The user is also asked whether they want to start the quiz or exit the game.
   * The `welcome()` returns the user name and the answer to whether the user wants to begin the quiz or not.
   * Finally the module ***exports*** the `welcome()` method, which is invoked by the `app.js` module.

1. [instructions.js](https://github.com/bharati-21/how-well-do-you-know-me/blob/main/instructions.js)
   * This module only exports the instructions text, which is used by the `welcome()` in the `welcome.js` module.
   * The instructions use [`CHALK`](https://www.npmjs.com/package/chalk) and [`boxen`](https://www.npmjs.com/package/boxen) to style and add colors to the text.

1. [questions.js](https://github.com/bharati-21/how-well-do-you-know-me/blob/main/questions.js)
   * The module stores the questions in the form of `array of object` which are exported to the `app.js` module. 

1. [quiz.js](https://github.com/bharati-21/how-well-do-you-know-me/blob/main/quiz.js)
   * This module has `quiz()` method that imports the 10 questions in the form of array of object from the `questions.js` module.
   * These questions are displayed to the user, and then user enters the choice of answer.
   * This answer is checked with the original answer and the score is updated.
   * The final score is returned to the `app.js` module where the final score is displayed using various styles from [`CHALK`](https://www.npmjs.com/package/chalk) and [`boxen`](https://www.npmjs.com/package/boxen).


## EXTERNAL PACKAGES AND MODULES USED
1. [`CHALK`](https://www.npmjs.com/package/chalk)
   * This package is used to add colors, styles and weights to plain console.log displays
 
1. [`boxen`](https://www.npmjs.com/package/boxen)
   * This package provides box like styles with padding, borders, margins, colors and backgrounds

1. [`readline-sync`](https://www.npmjs.com/package/readline-sync)
   * This package provides interactivity to have a conversation with the user via a console.

1. [`cli-spinner`](https://www.npmjs.com/package/cli-spinner)
   * This package provides spinners and loading objects to indicate a loading process.

1. [`clear`](https://www.npmjs.com/package/clear)
   * This package is used to clear the terminal screen or move the cursor position to the topmost left of the terminal (0,0).
