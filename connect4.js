/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  function makeBoard() {
    for (let y = 0; y < HEIGHT; y++) { // // This starts a for loop. It sets y = 0, y must be less than 6 (HEIGHT), and y++ increases the value each time the code block is executed. 
      board.push(Array.from({ length: WIDTH })); // This takes the empty array of board and uses the .push method to push a new array with the length of 7 into it which creates a matrix array.
    }
  }

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const board = document.getElementById('board');
 
  const top = document.createElement("tr"); // This creates a variable with the name of 'top' which will create a tr (table row) on the document
  top.setAttribute("id", "column-top"); // This gives the tr that was created an id of "column-top"
  top.addEventListener("click", handleClick); // This adds a click event listener to the tr that was created. 

  for (let x = 0; x < WIDTH; x++) {  // This starts a for loop. It sets x = 0, x must be less than 7 (WIDTH), and x++ increases the value each time the code block is executed. 
    const headCell = document.createElement("td"); // This is creating the variable of headCell which will create a td element. A td defines a standard data cell in and HTML document. 
    headCell.setAttribute("id", x);  // This code give the td that was created by headCell the id of x.
    top.append(headCell); // This adds the "top" variable to the headCell variable
  } // Ends the  for loop
  
  board.append(top); // This adds the 'board' variable to the 'top' varibale. 

  for (let y = 0; y < HEIGHT; y++) {   // This starts a for loop. It sets y = 0, y must be less than 6 (HEIGHT), and y++ increases the value each time the code block is executed. 
    const row = document.createElement("tr"); // This created the variale of 'row'. 'row' will create tr (table rows). It should create 6 rows since y should be less than 6.

    for (let x = 0; x < WIDTH; x++) {  // This starts a for loop. It sets x = 0, x must be less than 7 (WIDTH), and x++ increases the value each time the code block is executed. 
      const cell = document.createElement("td"); // This creates the varibale 'cell' which will create td elements (data cells)
      cell.setAttribute("id", `${y}-${x}`); // This gives the td elements created in the cell variable the id of `${y}-${x}`
      row.append(cell); // This adds the row variable contents to the cell varibale contents. 
    } // This ends the loops
    board.append(row); // ?? This adds the 'board' variable to the 'row' varibale. 
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

//function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
//  return 0;
// }

function findSpotForCol(x) {
  for (let y = HEIGHT - 1; y >= 0; y--) { // y = 6-1; y has to be greater than or equal to 0; y-- the decrement operator decreases and returns the value before decreasing.
    if (!board[y][x]) { // This returns if y undefined
      return y;
    }
  }
  return null; // returns if y is full
}


/** placeInTable: update DOM to place piece into HTML table of board */

//function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
//}

function placeInTable(y, x) { // begins the function
  const piece = document.createElement('div'); // creates a variale named 'piece' that creates a div on the document
  piece.classList.add('piece'); // adds the divs created in 'piece' to the classList
  piece.classList.add(`p${currPlayer}`); // This adds a class that shows which player placed the piece
  piece.style.top = -50 * (y + 2); // This is for styling of when the piece is placed at the top

  const spot = document.getElementById(`${y}-${x}`); // creates the variable 'spot' which gets the inputs of the y and x element by their Id. 
  spot.append(piece); // this adds the 'spot' variable to the 'piece' variable
}



/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}
/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }
  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) { // This calls the function of checkForWin. if it meets the requirements that one or the other player won then it will return the endGame message of who won the game. 
    return endGame(`Player ${currPlayer} won!`);
  }
  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {
    return endGame('Tie!');
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2

if (currPlayer === 1) { // This function switches between players. 
      currPlayer = 2 // if the current player is 1 then it switches to 2.
  } else {
     currPlayer = 1 // If it is 2 then it switches back to 1.
  }};


/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every( // This checks if every cell meets the following criteria.
      ([y, x]) => // these are the arguements and the => initiates a function
        y >= 0 && // checks if y is greater than or equal to 0 AND
        y < HEIGHT &&  // y is less than 6 (HEIGHT) AND
        x >= 0 &&  // x is greater than or equal to 0 AND
        x < WIDTH && // x is less than 7 (WIDTH) AND
        board[y][x] === currPlayer  // This is if all are legal coordinates and if all match the current player
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) { // for loop. It sets y = 0, y must be less than 6 (HEIGHT), and y++ increases the value each time the code block is executed. 
    for (let x = 0; x < WIDTH; x++) { // for loop. It sets x = 0, x must be less than 7 (WIDTH), and x++ increases the value each time the code block is executed. 
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];  //  determines if there are four in a row of the same color horizontally. 
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];   // determines if there are four in a row of the same color vertically.
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]]; // determines if there are four in a row of the same color diagonally right.
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]]; // //  determines if there are four in a row of the same color diagonally left.

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) { // if any of these conditions are met then it result in a win and returns true.
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
