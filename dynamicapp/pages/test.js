function getMove(board, symbol) {
    // Define the symbols for the player and computer
    const playerSymbol = symbol === 'O' ? 'X' : 'O';
  
    // Check if the game is over and return a score accordingly
    if (checkWinner(board, playerSymbol)) {
      return -1;
    } else if (checkWinner(board, symbol)) {
      return 1;
    } else if (isBoardFull(board)) {
      return 0;
    }
  
    // Create an array to store all possible moves and their scores
    const moves = [];
  
    // Loop through the empty cells and evaluate each possible move
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        if (board[row][col] === ' ') {
          // Try the move for the computer
          board[row][col] = symbol;
          // Calculate the score for this move using minimax
          const score = -getMove(board, playerSymbol);
          // Reset the cell
          board[row][col] = ' ';
          // Append the move and score to the array
          moves.push({ score, move: { row, col } });
        }
      }
    }
  
    // Choose the move with the highest score (for the computer)
    const bestMove = moves.reduce((best, current) => (current.score > best.score ? current : best));
    return bestMove.move;
  }
  
  function checkWinner(board, symbol) {
    // Check rows, columns, and diagonals for a win
    for (let i = 0; i < 3; i++) {
      if (
        board[i].every((cell) => cell === symbol) ||
        [0, 1, 2].every((row) => board[row][i] === symbol)
      ) {
        return true;
      }
    }
    if (
      [0, 1, 2].every((i) => board[i][i] === symbol) ||
      [0, 1, 2].every((i) => board[i][2 - i] === symbol)
    ) {
      return true;
    }
    return false;
  }
  
  function isBoardFull(board) {
    // Check if the board is full (a tie)
    return board.every((row) => row.every((cell) => cell !== ' '));
  }
  
  // Example usage:
  const board = [['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' ']];
  const computerSymbol = 'O';
  const bestMove = getMove(board, computerSymbol);
  console.log("Best move for the computer:", bestMove);
  