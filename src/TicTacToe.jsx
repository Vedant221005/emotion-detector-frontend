// src/TicTacToe.jsx
import React, { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(board);
  const currentPlayer = xIsNext ? "X" : "O";

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="mt-10 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-lg shadow-lg w-full max-w-sm mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">🎮 Tic Tac Toe</h2>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, idx) => (
          <button
            key={idx}
            onClick={() => handleClick(idx)}
            className="w-20 h-20 text-3xl font-bold rounded-md bg-blue-100 hover:bg-blue-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white transition"
          >
            {cell}
          </button>
        ))}
      </div>
      <div className="mt-4 text-center text-lg font-medium text-gray-900 dark:text-white">
        {winner
          ? `🎉 Winner: ${winner}`
          : board.every(Boolean)
          ? "🤝 It's a draw!"
          : `Player Turn: ${currentPlayer}`}
      </div>
      <button
        onClick={resetGame}
        className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition"
      >
        🔄 Restart
      </button>
    </div>
  );
};

// Winner logic
function calculateWinner(cells) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6],           // Diagonals
  ];
  for (const [a, b, c] of lines) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}

export default TicTacToe;
