import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TicTacToe from "./TicTacToe";
import Quiz from "./Quiz";
import EmojiPuzzle from "./EmojiPuzzle";

const Games = () => {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState(null); // 'tictactoe', 'quiz', 'emoji'

  const toggleGame = (game) => {
    setActiveGame((prev) => (prev === game ? null : game)); // toggle logic
  };

  return (
    <div className="relative min-h-screen p-10 flex flex-col items-center justify-start bg-gradient-to-br from-green-100 to-yellow-200 dark:from-gray-900 dark:to-gray-800 text-center">
      
      {/* Home Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 px-4 py-2 bg-black/70 hover:bg-black/90 text-white font-semibold rounded-lg shadow-lg transition duration-300 backdrop-blur-md"
      >
        🏠 Home
      </button>

      {/* Heading */}
      <h1 className="text-4xl md:text-5xl font-bold text-purple-700 dark:text-white mb-6 mt-16">
        🎮 Uplift Your Mood with Games!
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 max-w-xl">
        Here are some fun and stress-relieving games you can enjoy to brighten your day!
      </p>

      {/* 🔹 Online Games Section */}
      <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-4">
        🌐 Online Games
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl mb-12">
        <a href="https://www.slither.io/" target="_blank" rel="noreferrer" className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition">
          🐍 Slither.io
        </a>
        <a href="https://minesweeperonline.com/" target="_blank" rel="noreferrer" className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition">
          💣 Minesweeper
        </a>
        <a href="https://www.google.com/logos/2010/pacman10-i.html" target="_blank" rel="noreferrer" className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition">
          👾 Pac-Man Doodle
        </a>
        <a href="https://play2048.co/" target="_blank" rel="noreferrer" className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition">
          🔢 2048 Puzzle
        </a>
        <a href="https://trex-runner.com" target="_blank" rel="noreferrer" className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition">
          🦖 Dinosaur T-Rex Game
        </a>
        <a href="https://doodlecricket.github.io/" target="_blank" rel="noreferrer" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition">
          🏏 Doodle Cricket
        </a>
      </div>

      {/* 🔸 Offline Games Section */}
      <h2 className="text-2xl font-semibold text-orange-700 dark:text-orange-300 mb-4">
        📴 Offline Games
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-5xl mb-10">
        <button
          onClick={() => toggleGame("tictactoe")}
          className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition ${
            activeGame === "tictactoe" ? "ring-4 ring-white" : ""
          }`}
        >
          ❌⭕ Tic Tac Toe 
        </button>
        <button
          onClick={() => toggleGame("quiz")}
          className={`bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition ${
            activeGame === "quiz" ? "ring-4 ring-white" : ""
          }`}
        >
          ❓🎓 Campus Chronicles: The Quiz 
        </button>
        <button
          onClick={() => toggleGame("emoji")}
          className={`bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition ${
            activeGame === "emoji" ? "ring-4 ring-white" : ""
          }`}
        >
          🎬🧩 Movie Emoji Puzzle 
        </button>
      </div>

      {/* Render Selected Offline Game */}
      {activeGame === "tictactoe" && (
        <div className="w-full max-w-3xl mb-10">
          <TicTacToe />
        </div>
      )}
      {activeGame === "quiz" && (
        <div className="w-full max-w-3xl mb-10">
          <Quiz />
        </div>
      )}
      {activeGame === "emoji" && (
        <div className="w-full max-w-3xl mb-10">
          <EmojiPuzzle />
        </div>
      )}
    </div>
  );
};

export default Games;
